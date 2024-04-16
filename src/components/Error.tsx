import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-3xl p-5 font-bold">Error</div>
      <button
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
};

export default Error;
