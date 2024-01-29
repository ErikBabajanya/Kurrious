export default function page() {
  return (
    <div className="flex">
      <div className="w-1/4	bg-slate-100 pl-3">
        <div className="h-12	flex items-center">Conversations</div>

        <button className="w-11/12 h-10 flex items-center border-solid border-2 border-sky-500 rounded-md">
          + New conversation
        </button>
      </div>
      <div>
        <div>New Chat</div>
      </div>
    </div>
  );
}
