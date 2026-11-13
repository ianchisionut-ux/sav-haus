"""Editable Blender models and optimized GLBs reconstructed from catalog elevations.
No IFC geometry is available: this is a visual architectural reconstruction.
"""
import bpy, math, random, os, json
from mathutils import Vector
random.seed(2026)
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=os.path.join(ROOT,'public','models')
os.makedirs(OUT,exist_ok=True)
scene=bpy.data.scenes.new('SAV HAUS • Colectia 8 modele')
bpy.context.window.scene=scene
scene.unit_settings.system='METRIC'
materials={}
def material(key,color,rough=.7,metal=0):
    m=bpy.data.materials.new('SAV | '+key);m.use_nodes=True
    p=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
    p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
    m.diffuse_color=(*color,1);materials[key]=m;return m
material('stucco',(.82,.80,.73),.86)
material('cream',(.72,.65,.51),.85)
material('wood',(.32,.15,.055),.62)
material('roof',(.055,.068,.078),.52)
material('terracotta',(.30,.085,.041),.65)
material('metal',(.025,.036,.040),.29,.7)
material('glass',(.105,.18,.19),.10,.40)
material('interior',(.26,.19,.105),.87)
material('curtain',(.62,.57,.44),.95)
material('stone',(.21,.235,.23),.86)
material('paving',(.39,.40,.35),.87)
material('grass',(.105,.18,.034),.98)
material('soil',(.068,.050,.025),1)
material('trunk',(.14,.075,.032),.95)
material('leaf',(.052,.13,.025),.90)
material('leaf-light',(.12,.22,.045),.92)
material('flower',(.83,.80,.60),.8)
material('water',(.045,.25,.28),.10,.32)
material('light',(1,.60,.20),.25)
p=next(n for n in materials['light'].node_tree.nodes if n.type=='BSDF_PRINCIPLED');p.inputs['Emission Color'].default_value=(1,.45,.12,1);p.inputs['Emission Strength'].default_value=3
# Procedural tileable surface maps authored locally; glTF embeds these textures.
for key,file,repeat in [('grass','grass.jpg',1),('wood','wood.jpg',1),('stucco','stucco.jpg',1),('cream','stucco.jpg',1),('paving','paving.jpg',1),('stone','stone.jpg',1)]:
    path=os.path.join(ROOT,'tmp','textures',file)
    if os.path.exists(path):
        m=materials[key];p=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
        n=m.node_tree.nodes.new('ShaderNodeTexImage');n.image=bpy.data.images.load(path,check_existing=True)
        m.node_tree.links.new(n.outputs['Color'],p.inputs['Base Color'])

buffers={};group='architecture'
def poly(v,faces,mat,uvscale=1):
    buf=buffers.setdefault((group,mat),[[],[],[]]);start=len(buf[0]);buf[0].extend(v)
    for f in faces:
        ff=tuple(start+i for i in f);buf[1].append(ff)
        a,b,c=[Vector(v[f[i]]) for i in range(3)];normal=(b-a).cross(c-a);axis=max(range(3),key=lambda i:abs(normal[i]))
        dims=[i for i in range(3) if i!=axis]
        buf[2].append([(v[i][dims[0]]*uvscale,v[i][dims[1]]*uvscale) for i in f])
def box(x,y,z,w,d,h,mat,angle=0):
    c,s=math.cos(angle),math.sin(angle)
    v=[(x+sx*w/2*c-sy*d/2*s,y+sx*w/2*s+sy*d/2*c,z+sz*h/2) for sz in [-1,1] for sy in [-1,1] for sx in [-1,1]]
    poly(v,[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)],mat)
def rod(a,b,r,mat,n=8):
    a,b=Vector(a),Vector(b);axis=(b-a).normalized();u=axis.cross(Vector((0,0,1)))
    if u.length<.01:u=axis.cross(Vector((1,0,0)))
    u.normalize();v=axis.cross(u);vv=[]
    for p in [a,b]:
        for i in range(n):vv.append(tuple(p+r*(u*math.cos(i*math.tau/n)+v*math.sin(i*math.tau/n))))
    poly(vv,[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)],mat)
def leaf(p,size,mat):
    a=random.random()*math.tau;u=Vector((math.cos(a),math.sin(a),random.uniform(-.35,.35)))*size
    v=Vector((-math.sin(a),math.cos(a),random.uniform(-.5,.5)))*size*.36;p=Vector(p)
    poly([tuple(p-u),tuple(p-u*.4+v),tuple(p+u*.5+v*.7),tuple(p+u),tuple(p+u*.5-v*.7),tuple(p-u*.4-v)],[(0,1,2,3,4,5)],mat)
def bush(x,y,r=.6,flowers=False):
    for i in range(180):
        a=random.random()*math.tau;rr=r*math.sqrt(random.random());zz=math.sqrt(max(0,1-(rr/r)**2))*r*.95
        leaf((x+rr*math.cos(a),y+rr*math.sin(a),.05+zz+random.uniform(-.10,.1)),.11,random.choice(['leaf','leaf-light']))
    if flowers:
        for i in range(24):
            a=random.random()*math.tau;rr=random.random()*r*.7;cx=x+rr*math.cos(a);cy=y+rr*math.sin(a)
            for j in range(4):leaf((cx+random.uniform(-.08,.08),cy+random.uniform(-.08,.08),r*.9+random.uniform(-.06,.1)),.075,'flower')
def tree(x,y,h=5):
    rod((x,y,0),(x+.15,y,h*.7),h*.027,'trunk',9)
    for i in range(10):
        a=i*2.4;z=h*(.38+i*.034);rr=h*random.uniform(.17,.29)
        endpoint=(x+math.cos(a)*rr,y+math.sin(a)*rr,z+h*.22)
        rod((x,y,z),endpoint,h*.008,'trunk',6)
        for j in range(100):
            aa=random.random()*math.tau;dist=rr*.65*random.random()**.5;zz=random.uniform(-.7,.8)
            leaf((endpoint[0]+math.cos(aa)*dist,endpoint[1]+math.sin(aa)*dist,endpoint[2]+zz),.30,random.choice(['leaf','leaf-light']))
def frame(side,pos,center,w,z,h,door=False):
    # side X: wall along x at y=pos, side Y: wall along y at x=pos.
    def part(c,zz,ww,hh,depth,mat,offset=0):
        if side=='X':box(c,pos+offset,zz,ww,depth,hh,mat)
        else:box(pos+offset,c,zz,depth,ww,hh,mat)
    part(center,z,w,h,.035,'interior')
    part(center,z,w-.09,h-.08,.04,'glass',-.055 if pos<0 else .055)
    for xx in [center-w/2+.035,center+w/2-.035]:part(xx,z,.07,h,.18,'metal')
    for zz in [z-h/2+.035,z+h/2-.035]:part(center,zz,w,.07,.18,'metal')
    if w>1.05:part(center,z,.045,h,.17,'metal')
    if not door:part(center,z-h/2-.045,w+.18,.07,.30,'stone')
    # Warm curtains behind the glass add perceived depth.
    for xx in [center-w*.35,center+w*.35]:part(xx,z,w*.20,h-.13,.02,'curtain',.055 if pos<0 else -.055)
    if door:part(center+w*.30,1.3,.025,.29,.035,'metal',-.15 if pos<0 else .15)
def wall(side,pos,start,end,height,holes,mat='stucco',base=.3):
    cuts=sorted(set([start,end]+[q for c,w,z,h,*_ in holes for q in [c-w/2,c+w/2]]))
    for a,b in zip(cuts[:-1],cuts[1:]):
        mid=(a+b)/2;hole=next((o for o in holes if abs(mid-o[0])<o[1]/2),None)
        spans=[(base,height)] if hole is None else [(base,max(base,hole[2]-hole[3]/2)),(hole[2]+hole[3]/2,height)]
        for z0,z1 in spans:
            if z1<=z0:continue
            if side=='X':box(mid,pos,(z0+z1)/2,b-a,.28,z1-z0,mat)
            else:box(pos,mid,(z0+z1)/2,.28,b-a,z1-z0,mat)
    for c,w,z,h,*door in holes:frame(side,pos,c,w,z,h,bool(door and door[0]))
def roof_quad(v,mat):
    # Bilinear profiled ceramic tiles; every tile is actual relief geometry.
    a,b,c,d=[Vector(p) for p in v];poly(v,[(0,1,2,3)],mat)
    span=(b-a).length;run=max((d-a).length,(c-b).length)
    nx=max(1,round(span/.31));ny=max(1,round(run/.30))
    for j in range(ny):
        t0=j/ny;t1=min(1,(j+1)/ny+.014)
        left=a.lerp(d,t0);right=b.lerp(c,t0);left2=a.lerp(d,t1);right2=b.lerp(c,t1)
        for i in range(nx):
            vv=[]
            for row,(ll,rr) in enumerate([(left,right),(left2,right2)]):
                for k in range(5):
                    t=(i+k/4*.97)/nx;p=ll.lerp(rr,t);p.z+=.035+.018*math.cos(k/4*math.tau)+(.014 if row else 0);vv.append(tuple(p))
            poly(vv,[(k,k+1,k+6,k+5) for k in range(4)],mat)
def roof(w,d,eave,rise,hip=False,axis='Y',red=False):
    mat='terracotta' if red else 'roof';ww=w/2+.52;dd=d/2+.52;z=eave+.10
    if axis=='X' and not hip:
        roof_quad([(-ww,-dd,z),(ww,-dd,z),(ww,0,z+rise),(-ww,0,z+rise)],mat)
        roof_quad([(ww,dd,z),(-ww,dd,z),(-ww,0,z+rise),(ww,0,z+rise)],mat)
        for x in [-w/2,w/2]:poly([(x-.14,-d/2,eave),(x-.14,d/2,eave),(x-.14,0,z+rise),(x+.14,-d/2,eave),(x+.14,d/2,eave),(x+.14,0,z+rise)],[(0,1,2),(3,5,4)],'stucco')
        rod((-ww,0,z+rise+.06),(ww,0,z+rise+.06),.09,mat,12)
        for x in [-ww,ww]:
            for y in [-dd,dd]:rod((x,y,z),(x,0,z+rise+.03),.085,'wood',4)
        for y in [-dd,dd]:rod((-ww,y,z),(ww,y,z),.07,'metal',10)
    elif not hip:
        roof_quad([(-ww,-dd,z),(-ww,dd,z),(0,dd,z+rise),(0,-dd,z+rise)],mat)
        roof_quad([(ww,dd,z),(ww,-dd,z),(0,-dd,z+rise),(0,dd,z+rise)],mat)
        for y in [-d/2,d/2]:poly([(-w/2,y,eave),(w/2,y,eave),(0,y,z+rise)],[(0,1,2)],'stucco')
        rod((0,-dd,z+rise+.06),(0,dd,z+rise+.06),.09,mat,12)
        for y in [-dd,dd]:
            for x in [-ww,ww]:rod((x,y,z),(0,y,z+rise+.03),.085,'wood',4)
        for x in [-ww,ww]:rod((x,-dd,z),(x,dd,z),.07,'metal',10)
    else:
        # Short ridge parallel to x, hipped roof on four slopes.
        ridge=max(.3,(w-d)/2);A=(-ridge,0,z+rise);B=(ridge,0,z+rise)
        roof_quad([(-ww,-dd,z),(ww,-dd,z),B,A],mat)
        roof_quad([(ww,dd,z),(-ww,dd,z),A,B],mat)
        roof_quad([(-ww,dd,z),(-ww,-dd,z),A,A],mat)
        roof_quad([(ww,-dd,z),(ww,dd,z),B,B],mat)
        for x,y,p in [(-ww,-dd,A),(-ww,dd,A),(ww,-dd,B),(ww,dd,B)]:rod((x,y,z),p,.075,mat,8)
        rod(A,B,.10,mat,10)
        for y in [-dd,dd]:rod((-ww,y,z),(ww,y,z),.075,'metal',10)
        for x in [-ww,ww]:rod((x,-dd,z),(x,dd,z),.075,'metal',10)
    # Eave fascia, soffits and downspouts.
    box(0,0,eave-.055,w+1.03,d+1.03,.10,'wood')
    for x in [-w/2-.18,w/2+.18]:
        for y in [-d/2-.16,d/2+.16]:rod((x,y,.15),(x,y,eave),.045,'metal',8)
def pergola(x,y,w,d,z):
    for xx in [x-w/2,x+w/2]:
        for yy in [y-d/2,y+d/2]:box(xx,yy,z/2,.17,.17,z,'wood')
    for xx in [x-w/2,x+w/2]:box(xx,y,z,.16,d+.3,.20,'wood')
    for i in range(int(w/.52)+1):box(x-w/2+i*.52,y,z+.12,.11,d+.5,.16,'wood')
def finish_model(index,objects):
    for (g,mat),(v,f,uv) in buffers.items():
        me=bpy.data.meshes.new(g+'_'+mat);me.from_pydata(v,[],f);me.update();layer=me.uv_layers.new(name='UVMap')
        for face,coords in zip(me.polygons,uv):
            for li,coord in zip(face.loop_indices,coords):layer.data[li].uv=coord
        ob=bpy.data.objects.new(g+'_'+mat,me);scene.collection.objects.link(ob);ob.data.materials.append(materials[mat]);objects.append(ob)
        if mat in ['leaf','leaf-light','flower']:ob.data.materials[0].use_backface_culling=False
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0]
    path=os.path.join(OUT,'casa-'+str(index).zfill(2)+'.glb')
    bpy.ops.export_scene.gltf(filepath=path,export_format='GLB',use_selection=True,export_yup=True,export_extras=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=5)
    # Offset Blender objects for the editable neighborhood; GLBs stay local-origin.
    for ob in objects:ob.location.x+=((index-1)%4)*34;ob.location.y+=((index-1)//4)*34
    print('EXPORTED',index,os.path.getsize(path),flush=True)

specs=[(10,7.5,2.8,2.65,False,'X'),(11.5,10,2.8,2.4,True,'Y'),(13,10,2.8,3.0,False,'Y'),(13.5,10.7,2.8,2.7,True,'Y'),(16.5,9,2.8,2.7,True,'Y'),(8,9,4.15,3.1,False,'Y'),(10.5,8.5,4.15,3.6,False,'Y'),(12,8.5,5.8,2.5,True,'Y')]
for index,(w,d,h,rise,hip,axis) in enumerate(specs,1):
    buffers={};objects=[];group='architecture';z=h+.3
    wallmat='cream' if index==4 else 'stucco'
    box(0,0,.10,w+.14,d+.14,.32,'stone')
    # Wall holes provide actual recesses instead of placing windows on a solid cube.
    for side,pos,start,end in [('X',-d/2,-w/2,w/2),('X',d/2,-w/2,w/2),('Y',-w/2,-d/2,d/2),('Y',w/2,-d/2,d/2)]:
        length=end-start;holes=[]
        if index==3 and side=='X' and pos<0:
            wall('X',pos,start,.7,z,[(-4.1,1.2,1.43,2.26,True),(-1.4,1.6,1.43,2.26,True)])
            box(1.7,pos+1,(z+.3)/2,math.sqrt(8),.28,z-.3,wallmat,math.pi/4)
            wall('X',pos+2,2.7,end,z,[(4.8,1.5,1.43,2.26,True)])
            continue
        if index==3 and side=='Y' and pos>0:start+=2;length=end-start
        if index==2 and side=='X' and pos<0:
            end-=3.2;length=end-start
            wall('X',pos+2,end,w/2,z,[(w/2-1.6,1.3,1.43,2.26,True)])
            box(end,pos+1,(z+.3)/2,.28,2,z-.3,wallmat)
        if index==2 and side=='Y' and pos>0:start+=2;length=end-start
        if index==1 and side=='Y' and pos<0:holes=[(-1.6,1.10,1.42,2.24,True),(1.5,1.10,1.42,2.24,True)]
        elif index==1 and side=='X' and pos<0:holes=[(-2.4,1.8,1.73,1.3,False),(1.6,.9,1.73,1.3,False)]
        elif side=='X' and pos<0:
            count=max(3,round(length/3.3))
            for j in range(count):
                c=start+length*(j+.5)/count;door=(j==count//2 or j==0 and index in [3,6,8]);holes.append((c,1.3 if door else 1.15,1.42 if door else 1.73,2.24 if door else 1.27,door))
        else:
            count=max(2,round(length/3.3))
            for j in range(count):holes.append((start+length*(j+.5)/count,1.15 if j%2 else .8,1.75,1.25,False))
        if index==8:
            for j in range(max(2,round(length/3.4))):holes.append((start+length*(j+.5)/max(2,round(length/3.4)),1.2,4.56,1.4,False))
        wall(side,pos,start,end,z,holes,wallmat)
    if index in [6,7]:
        # Two windows in each mansard gable, proportioned to catalog references.
        for yy in [-d/2-.005,d/2+.005]:
            for xx in [-w*.24,w*.24]:frame('X',yy,xx,1.0,z+.88,1.25)
    roof(w,d,z,rise,hip,axis,index==4)
    # Timber accents with actual grooves, including the two-level house 07.
    for j in range(17):box(-w/2+.50+j*.066,-d/2-.155,1.55,.052,.045,2.48,'wood')
    if index in [2,3,7]:
        for xx in [-w/2+.11,w/2-.11]:box(xx,-d/2-.20,1.6,.20,.16,2.60,'wood')
    if index==5:
        # L-shaped living-wing extension, as shown on the 16.50 x 12.50 plan.
        ew=6.5;ex=-w/2+ew/2;ey=-d/2-1.75
        box(ex,ey,1.62,ew,3.5,2.64,wallmat)
        for xx in [ex-ew*.27,ex+ew*.27]:frame('X',ey-1.77,xx,1.65,1.45,2.25,True)
        box(ex,ey,z+.04,ew+.5,3.8,.14,'roof')
    if index in [4,6]:pergola(0,-d/2-1.65,w*.72,3.1,2.92)
    if index==8:
        box(0,-d/2-.72,3.12,6,1.5,.18,'stone')
        for xx in [-3,3]:box(xx,-d/2-.7,1.59,.20,.20,2.98,'stucco')
        for i in range(13):rod((-3+i*.5,-d/2-1.42,3.2),(-3+i*.5,-d/2-1.42,4.15),.018,'metal')
        rod((-3,-d/2-1.42,4.16),(3,-d/2-1.42,4.16),.035,'metal')
    for xx in [-w*.36,-w*.08,w*.20,w*.40]:
        box(xx,-d/2-.18,2.1,.12,.12,.25,'metal');box(xx,-d/2-.247,2.1,.07,.018,.16,'light')
    group='landscape'
    box(0,0,-.19,30,28,.30,'grass')
    box(0,-d/2-1.6,.10,min(w+1.8,21),3.2,.22,'stone')
    box(0,-d/2-3.25,.015,min(w+2,21),.35,.09,'stone')
    box(0,-10.5,-.015,2.0,6.7,.065,'paving')
    box(w/2+2.1,-3,-.015,2.6,18,.065,'paving')
    # Fence with open front entrance and warm timber slats.
    for x in [-14.5,14.5]:
        for j in range(7):box(x,1,.25+j*.19,.06,25,.11,'wood')
        for y in range(-11,14,3):box(x,y,.88,.11,.11,1.8,'metal')
    for j in range(7):box(0,13,.25+j*.19,29,.06,.11,'wood')
    for x in range(-14,15,3):box(x,13,.88,.11,.11,1.8,'metal')
    for x in [-13,-10,10,13]:tree(x,random.uniform(8.8,11.3),random.uniform(4.5,6.2))
    tree(-11,-7,4.5);tree(12,5,4.9)
    for i in range(10):
        x=-w/2+i*w/9;y=-d/2-3.8
        if abs(x)<1.6:continue
        box(x,y,-.015,.9,1.15,.04,'soil');bush(x,y,.43+(i%2)*.13,True)
    for y in [-7,-3,2,6]:bush(-12.8,y,.7,True)
    if index in [2,3,4,8]:
        # Pool is illustrative landscaping, not part of catalog house area.
        px=-w/2-3.6;py=-1
        box(px,py,-.005,3.7,6.5,.12,'stone');box(px,py,.065,3.1,5.9,.02,'water')
        for j in range(2):
            xx=px-2.8;yy=py-1.9+j*2.1
            box(xx,yy,.35,.8,1.85,.10,'curtain');box(xx,yy,.15,.64,1.5,.25,'wood')
    for x,y in [(-2,-11),(2,-11),(-w/2-1,-d/2-3),(w/2+1,-d/2-3)]:
        box(x,y,.36,.12,.12,.72,'metal');box(x,y,.61,.125,.125,.13,'light')
    finish_model(index,objects)
scene['source']='Catalog SAV HAUS 2026 • geometrie reconstituita vizual, nu IFC'
scene['site']='sav-haus.vercel.app'
world=bpy.data.worlds.new('SAV • cer');world.use_nodes=True;scene.world=world
lightdata=bpy.data.lights.new('Soare','SUN');lightdata.energy=2.5;lightdata.angle=.16;light=bpy.data.objects.new('Soare',lightdata);scene.collection.objects.link(light);light.rotation_euler=(.5,-.6,-.4)
camdata=bpy.data.cameras.new('Camera cartier');cam=bpy.data.objects.new('Camera cartier',camdata);scene.collection.objects.link(cam);cam.location=(-50,-85,85);cam.rotation_euler=(Vector((45,15,0))-cam.location).to_track_quat('-Z','Y').to_euler();scene.camera=cam
scene.render.engine='CYCLES';scene.cycles.samples=32
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'tmp','SAV_HAUS_8_Modele.blend'))
print('COLLECTION_COMPLETE',flush=True)
