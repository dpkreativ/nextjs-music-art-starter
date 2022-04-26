import { LoadingSVG } from './Icons';

const CreateAlbumArt = ({
  textChange,
  fileChange,
  onSubmit,
  textValue,
  loading,
}) => {
  return (
    <div>
      <form
        action="POST"
        onSubmit={onSubmit}
        className="flex flex-col space-y-2 items-center"
      >
        <div className="flex space-x-2">
          {/* Image selection input */}
          <div className="relative">
            <input
              type="file"
              name="file"
              className="absolute z-10 w-32 h-12 opacity-0"
              onChange={fileChange}
            />
            <label
              htmlFor="file"
              className="bg-blue-500 text-white rounded-lg shadow-md p-3 block relative w-32 h-12 text-center"
            >
              Select image
            </label>
          </div>

          {/* Text input */}
          <input
            type="text"
            value={textValue}
            onChange={textChange}
            className="px-3 border-2 border-blue-400 rounded shadow-lg outline-none"
            placeholder="Add album text here"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition-all text-white font-semibold py-2 px-4 h-12 shadow rounded-lg w-max"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <LoadingSVG />
              <p>Creating...</p>
            </span>
          ) : (
            'Create your album art'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAlbumArt;
