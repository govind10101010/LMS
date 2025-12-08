import React, { useState, useRef, useEffect } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { assets } from "../../assets/assets";

const AddCourses = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrices] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);

  const [chapters, setChapters] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // ------------ Add / Toggle / Remove Chapters -------------------
  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (!title) return;

      const newChapter = {
        chapterId: uniqid(),
        chapterTitle: title,
        collapsed: false,
        chapterOrder:
          chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        chapterContent: [],
      };

      setChapters([...chapters, newChapter]);
    }

    if (action === "remove") {
      setChapters(chapters.filter((c) => c.chapterId !== chapterId));
    }

    if (action === "toggle") {
      setChapters(
        chapters.map((c) =>
          c.chapterId === chapterId ? { ...c, collapsed: !c.collapsed } : c
        )
      );
    }
  };

  // ------------ Start Lecture Popup ------------
  const openPopup = (chapterId) => {
    setCurrentChapterId(chapterId);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setShowPopup(true);
  };

  // ------------ Add Lecture ------------
  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureUrl) return;

    const updatedChapters = chapters.map((ch) => {
      if (ch.chapterId === currentChapterId) {
        return {
          ...ch,
          chapterContent: [...ch.chapterContent, lectureDetails],
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    setShowPopup(false);
  };

  // ------------ Remove Lecture ------------
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter(
                (_, index) => index !== lectureIndex
              ),
            };
          }
          return chapter;
        })
      );
    }
  };

  // ------------ Init Quill Editor ------------
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="min-h-screen overflow-scroll flex flex-col items-start md:p-8 p-4">
      <form className=" flex flex-col gap-5">
        {/* ------------ Course Title ------------ */}
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <div className="flex items-center gap-2">
            {/* LEFT ARROW TO COLLAPSE ALL */}
            <img
              src={assets.dropdown_icon}
              alt=""
              className="w-4 cursor-pointer transition-all -rotate-90"
              onClick={() =>
                setChapters((prev) =>
                  prev.map((c) => ({ ...c, collapsed: !c.collapsed }))
                )
              }
            />

            <input
              type="text"
              placeholder="Type here"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="border border-gray-500 rounded px-3 py-2 outline-none w-full"
            />
          </div>
        </div>

        {/* ------------ Description, Price, Thumbnail ------------ */}
        <div className="flex flex-col gap-1 w-full">
          <p>Course Description</p>
          <div ref={editorRef} className="h-48 border border-gray-300 rounded"></div>

          <div className="flex items-center justify-between flex-wrap mt-4">
            {/* COURSE PRICE */}
            <div className="flex flex-col gap-1">
              <p>Course Price</p>
              <input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrices(e.target.value)}
                className="outline-none py-2 w-28 px-3 rounded border border-gray-500"
              />
            </div>

            {/* THUMBNAIL */}
            <div className="flex md:flex-row flex-col items-center gap-3">
              <p>Thumbnail</p>
              <label htmlFor="thumbnailImage" className="flex items-center gap-3">
                <img src={assets.file_upload_icon} className="p-3 bg-blue-500 rounded" />
                <input
                  type="file"
                  id="thumbnailImage"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                  <img className="max-h-10" src={URL.createObjectURL(image)} alt="" />
                )}
              </label>
            </div>
          </div>
        </div>

        {/* ------------ Discount ------------ */}
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="outline-none py-2 w-28 px-3 rounded border border-gray-500"
          />
        </div>

        {/* ------------ Chapters ------------ */}
        <div>
          {chapters.map((chapter, idx) => (
            <div key={idx} className="bg-white border rounded-lg mb-4">
              <div className="flex justify-between items-center p-4 border-b">

                {/* COLLAPSE ARROW */}
                <img
                  src={assets.dropdown_icon}
                  width={14}
                  alt=""
                  className={`cursor-pointer transition-all ${
                    chapter.collapsed && "-rotate-90"
                  }`}
                  onClick={() => handleChapter("toggle", chapter.chapterId)}
                />

                {/* CHAPTER TITLE */}
                <span className="font-semibold">
                  {idx + 1}. {chapter.chapterTitle}
                </span>

                {/* LECTURE COUNT */}
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>

                {/* REMOVE CHAPTER */}
                <img
                  src={assets.cross_icon}
                  className="cursor-pointer"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>

              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lec, i) => (
                    <div key={i} className="mb-2 flex justify-between">
                      <div>
                        {i + 1}. {lec.lectureTitle} — {lec.lectureDuration} mins —{" "}
                        <a className="text-blue-500" href={lec.lectureUrl} target="_blank">
                          Link
                        </a>{" "}
                        —{" "}
                        {lec.isPreviewFree ? (
                          <span className="text-green-600 font-medium">
                            Free Preview
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">Paid</span>
                        )}
                      </div>

                      <img
                        src={assets.cross_icon}
                        className="w-4 cursor-pointer"
                        onClick={() => handleLecture("remove", chapter.chapterId, i)}
                      />
                    </div>
                  ))}

                  <div
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                    onClick={() => openPopup(chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* ADD CHAPTER */}
          <div
            className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>
        </div>

        {/* -------- LECTURE POPUP -------- */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded w-full max-w-xs relative">
              <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

              <p>Lecture Title</p>
              <input
                className="w-full border rounded px-2 py-1 mb-2"
                value={lectureDetails.lectureTitle}
                onChange={(e) =>
                  setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
                }
              />

              <p>Duration (mins)</p>
              <input
                className="w-full border rounded px-2 py-1 mb-2"
                value={lectureDetails.lectureDuration}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureDuration: e.target.value,
                  })
                }
              />

              <p>Video URL</p>
              <input
                className="w-full border rounded px-2 py-1 mb-4"
                value={lectureDetails.lectureUrl}
                onChange={(e) =>
                  setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
                }
              />

              {/* PREVIEW FREE CHECKBOX */}
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                />
                <span>Preview Free</span>
              </label>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
                type="button"
                onClick={addLecture}
              >
                ADD
              </button>

              <img
                onClick={() => setShowPopup(false)}
                src={assets.cross_icon}
                className="absolute top-4 right-4 w-4 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button type="submit" className="bg-black text-white w-max py-2.5 px-8 rounded my-4">
          ADD COURSE
        </button>
      </form>
    </div>
  );
};

export default AddCourses;



