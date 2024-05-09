export function RootFooter() {
  return (
    <footer className="flex items-center gap-32 bg-dark-background px-[20rem] py-32 text-[2rem] text-slate-500 phones:flex-col phones:px-32">
      <div className="flex-1 phones:text-center">
        <p style={{ lineHeight: '130%' }}>
          Copyright © 2003 - 2024, SIAP PPDB Online Real Time Online. All
          rights reserved. Bekerjasama dengan Indosistem
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <div className="flex items-center gap-8">
          <p className="font-mono text-slate-500 hover:cursor-pointer hover:text-slate-200">
            Term & Condition
          </p>
          <p className="font-mono text-slate-500">|</p>
          <p className="font-mono text-slate-500 hover:cursor-pointer hover:text-slate-200">
            Privacy Police
          </p>
        </div>
      </div>
    </footer>
  )
}
