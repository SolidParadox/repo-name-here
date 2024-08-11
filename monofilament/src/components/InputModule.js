export default function InputModule ( { label, type, id, value, onChange, accept } ) {
  return ( 
    <div className="relative w-full bg-soft p-2 border-2 border-accent pt-8 pb-2 mt-5">
        <label className="absolute -top-2 bg-hard text-soft rounded-lg pl-2 pr-10 py-1" htmlFor={label}>{label}</label>
        <input
          className=""
          type={type}
          id={id}
          value= { value != null ? value : "" }
          accept={ accept != null ? accept : "" }
          onChange={onChange}
        />
      </div>
  );
};
