type Props = {
  index: string;
  label: string;
  dark?: boolean;
  className?: string;
};

export default function SectionDivider({ index, label, dark = false, className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={"sav-section-rule flex w-full items-center gap-3 pb-6 sm:gap-5 " + (dark ? "text-white/55" : "text-[#657571]") + " " + className}
    >
      <span className="text-[10px] font-extrabold tracking-[.18em] text-[#F9982D]">{index}</span>
      <span className="h-[7px] w-[7px] flex-none rotate-45 border border-[#F9982D]" />
      <span className={"min-w-5 flex-1 border-t " + (dark ? "border-white/20" : "border-[#a8b4b0]/50")} />
      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[.2em] sm:text-[10px]">{label}</span>
      <span className={"hidden w-12 border-t sm:block " + (dark ? "border-white/20" : "border-[#a8b4b0]/50")} />
    </div>
  );
}
