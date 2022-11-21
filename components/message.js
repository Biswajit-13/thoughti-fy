export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-10 rounded-full bg-cover" />
        <div className="flex-col items-center">
          <p className=" text-sm text-slate-700 font-[600]">{username}</p>
          <p className=" text-sm text-slate-500 font-[400]">a while ago</p>
        </div>
      </div>
      <div className="py-4 mt-3 bg-slate-300 rounded-[20px]">
        <p className="px-5 text-base text-slate-900 font-[500]">
          {description}
        </p>
      </div>
      <div className="mx-2 mt-3 text-sm text-pink-600">{children}</div>
    </div>
  );
}
