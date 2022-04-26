import { LoadingSVG } from './Icons';

const UploadPopArt = ({ onChange, onSubmit, loading }) => {
  return (
    <div>
      <form
        action="POST"
        onChange={onChange}
        onSubmit={onSubmit}
        className="flex flex-col items-center space-y-2"
      >
        {/* Image selection input */}
        <div className="relative">
          <input
            type="file"
            name="file"
            className="absolute z-10 w-52 h-12 opacity-0"
          />
          <label
            htmlFor="file"
            className="bg-blue-500 text-white rounded-lg shadow-md p-3 block relative w-52 h-12 text-center"
          >
            Select Popular Album Art
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition-all text-white font-semibold h-12 py-2 px-4 shadow rounded-lg w-max"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <LoadingSVG />
              <p>Applying...</p>
            </span>
          ) : (
            'Apply Neural Style Transfer'
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadPopArt;
