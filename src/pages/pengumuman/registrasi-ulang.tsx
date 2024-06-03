export function PengumumanRegistrasiUlang() {
  return (
    <div
      className="flex flex-col shadow"
      style={{
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
      }}
    >
      <div
        className="bg-[#242a30] p-32 text-white"
        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
      >
        Registrasi Ulang
      </div>
      <div className="flex flex-col gap-24 bg-white p-32">
        <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-[#ff5b57] p-32 text-danger-tint-1">
          <p>Batas Registrasi Ulang tanggal</p>
        </div>
        <ol className="ml-32 list-decimal">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nam
            tenetur vero, temporibus fugit voluptatum adipisci facere sapiente
            ipsum ducimus aspernatur officiis! Illo repudiandae, velit mollitia
            sint odit vel incidunt.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nam
            tenetur vero, temporibus fugit voluptatum adipisci facere sapiente
            ipsum ducimus aspernatur officiis! Illo repudiandae, velit mollitia
            sint odit vel incidunt.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nam
            tenetur vero, temporibus fugit voluptatum adipisci facere sapiente
            ipsum ducimus aspernatur officiis! Illo repudiandae, velit mollitia
            sint odit vel incidunt.
          </li>
        </ol>
      </div>
    </div>
  )
}
