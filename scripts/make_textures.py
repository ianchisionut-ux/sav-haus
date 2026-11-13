from PIL import Image,ImageFilter,ImageDraw
import numpy as np
from pathlib import Path
rng=np.random.default_rng(2026)
out=Path(__file__).resolve().parents[1]/'tmp'/'textures';out.mkdir(parents=True,exist_ok=True)
def noise(n=512):
    a=np.zeros((n,n),dtype=float)
    for size,weight in [(8,.3),(32,.2),(128,.2),(512,.3)]:
        im=Image.fromarray((rng.random((size,size))*255).astype('uint8')).resize((n,n),Image.Resampling.BILINEAR)
        a+=np.array(im)/255*weight
    return a
n=noise();fine=rng.random((512,512))
def save(name,base,variation):
    ar=np.array(base)[None,None,:]+(n[:,:,None]-.5)*np.array(variation)[None,None,:]+(fine[:,:,None]-.5)*9
    Image.fromarray(np.uint8(np.clip(ar,0,255))).save(out/(name+'.jpg'),quality=90)
save('grass',(68,92,31),(54,65,28));save('stucco',(216,211,196),(10,10,10));save('stone',(91,98,95),(25,26,24))
wood=np.zeros((512,512,3));bands=np.sin(np.arange(512)[None,:]*.5+np.array(Image.fromarray(np.uint8(n*255)).filter(ImageFilter.GaussianBlur(9)))/28)
for i,b in enumerate([120,78,38]):wood[:,:,i]=b+bands*7+(n-.5)*30
Image.fromarray(np.uint8(np.clip(wood,0,255))).save(out/'wood.jpg',quality=92)
im=Image.new('RGB',(512,512),(116,119,111));d=ImageDraw.Draw(im)
for row in range(8):
    for col in range(-1,5):
        x=col*128+(row%2)*64;c=int(rng.integers(130,157))
        d.rounded_rectangle((x+2,row*64+2,x+125,row*64+61),radius=4,fill=(c,c+2,c-6))
im.save(out/'paving.jpg',quality=92)
print(out)
