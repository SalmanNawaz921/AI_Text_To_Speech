import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useSyntesizeTextMutation } from "../services/audio";
import { arrOfLangs } from "../constants";
const Demo = () => {
  const [text, setText] = useState({
    lang: "en-US-1",
    txt: "",
  });

  const [audio, setAudio] = useState({ audioLink: "" });
  const [allAudios, setAllAudios] = useState([]); // [{lang,txt,audioLink}
  const [copied, setCopied] = useState("");
  useEffect(() => {
    const audiosFromLocalStage = JSON.parse(localStorage.getItem("audios"));
    if (audiosFromLocalStage) {
      setAllAudios(audiosFromLocalStage);
    }
  }, []);
  const [synthesizeText, { isError, isFetching }] = useSyntesizeTextMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await synthesizeText({
      msg: text.txt,
      lang: text.lang,
      source: "ttsmp3",
    });
    if (data?.URL) {
      const newAudio = data.URL;
      const updateAllAudios = [newAudio, ...allAudios];
      setAudio({ audioLink: newAudio });
      setAllAudios(updateAllAudios);
      console.log(newAudio);
      localStorage.setItem("audios", JSON.stringify(updateAllAudios));
    }
  };
  const handleCopy = (url) => {
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full">
        <form
          action=""
          className="relative flex-col justify-around items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-1 justify-between">
            <select
              name="Select Language"
              id=""
              className="lang_input peer mb-5 "
              placeholder="Select Language"
              onChange={(e) => {
                setText({ ...text, lang: e.target.value });
                console.log(text.lang);
              }}
            >
              <option value="" disabled selected hidden>
                Select Language
              </option>
              {Object.keys(arrOfLangs[0]).map((lang, index) => (
                <option key={`lang-${index}`} value={arrOfLangs[0][lang]}>
                  {lang}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="submit_btn peer-focus: border-gray-700 peer-focus:text-gray-700  "
            >
              &#x2192;
            </button>
          </div>
          <div className="flex mb-2">
            <input
              type="text"
              placeholder="Type something and hit enter to get your desired results"
              value={text.txt}
              onChange={(e) => {
                setText({ ...text, txt: e.target.value });
              }}
              // required
              className="url_input peer"
            />
          </div>
        </form>

        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-40 h-40 object-contain"
            />
          ) : isError ? (
            <p className="mt-2 text-red-500">Error synthesizing text</p>
          ) : (
            audio.audioLink && (
              <div className="my-1">
                <p className="flex items-center">
                  <audio controls src={audio.audioLink} className="ml-2" />
                </p>
              </div>
            )
          )}
        </div>
        {/* BROWSE URL HISTY*/}

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          <p>{allAudios.length > 0 ? "Previous Audios" : ""} </p>
          {allAudios.map((audio, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setAudio({ audioLink: audio })}
              className="link_card"
            >
              <div className="copy-btn" onClick={() => handleCopy(audio)}>
                <img
                  src={copied === audio ? tick : copy}
                  alt="copyIcon"
                  className="w-[40%] h-12 object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {audio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Demo;
