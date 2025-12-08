import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AddContext'
import { useParams } from 'react-router-dom'
import humanizeDuration from 'humanize-duration'

const Player = () => {

  const { enrolledCourses, calculateChapterTime } = useContext(AppContext)
  const { courseId } = useParams()

  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)

  const getCourseData = () => {
    const found = enrolledCourses.find(c => c._id === courseId)
    if (found) setCourseData(found)
  }

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  useEffect(() => {
    getCourseData()
  }, [enrolledCourses])

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid-cols-2 gp-10 md:px-36'>
        
        {/* LEFT COLUMN */}
        <div className='text-gray-800'>
          <h2 className='text-xl font font-semibold'>Course Structure</h2>

          <div className='pt-5'>
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                
                {/* Chapter Header */}
                <div
                  className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                  onClick={() => toggleSection(index)}
                >
                  <div className='flex items-center gap-2'>
                    <img
                      className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      src={assets.down_arrow_icon}
                      alt='arrow'
                    />
                    <p className='font-medium md:text-base text-sm'>
                      {chapter.chapterTitle}
                    </p>
                  </div>

                  <p className='text-sm md:text-default'>
                    {chapter.chapterContent.length} lectures •{' '}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>

                {/* Expandable lectures */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img
                          src={assets.play_icon}
                          className='w-4 h-4 mt-1'
                          alt='play'
                        />

                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>

                          <div className='flex gap-2'>
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: i + 1,
                                  })
                                }
                                className='text-blue-500 cursor-pointer'
                              >
                                Watch
                              </p>
                            )}

                            <p>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ['h', 'm'] }
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (player area) */}
        <div>
          {/* You can insert your video player UI here */}
        </div>

      </div>
    </>
  )
}

export default Player

