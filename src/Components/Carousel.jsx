import React, { useState, useEffect } from 'react'
import img_1 from '../assets/img_1.jpg';
import img_2 from '../assets/img_2.jpg';
import img_3 from '../assets/img_3.jpg';
import img_4 from '../assets/img_4.jpg';
import img_5 from '../assets/img_5.jpg';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

const Carousel = () => {
    const [imagePointer, setImagePointer] = useState(2);
    const [imageList, setImageList] = useState([img_1, img_2, img_3, img_4, img_5]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [position, setPosition] = useState(2);

    const handleSliding = () => { 
      setImageList(prevList => {
            const newList = [...prevList];
            const removedImage = newList.shift();
            newList.push(removedImage);
            return newList;
        });
    }

    const handleSlidingBack = () => {
      setImageList(prevList => {
          const newList = [...prevList];
          const removedImage = newList.pop();
          newList.unshift(removedImage);
          return newList;
      });

      if (position === 0){
        setPosition(3);
      }
      else if (position === 1){
        setPosition(4)
      }
      else {
        setPosition(position-2);
      }
  }

  const handleImageClicked = (index) => {
    if(index === 2){
      return;
    }
    if(index === 1){
      handleSlidingBack();
    }
    else if(index === 3){
      handleSliding();
    }
    else if(index === 0){
      setImageList(prevList => {
        const newList = [...prevList];
        const lastImage = newList.pop();
        newList.unshift(lastImage);
        const secondLastImage = newList.pop();
        newList.unshift(secondLastImage);
        return newList;
    });
      if (position === 1){
        setPosition(3);
      }
      else if (position === 0){
        setPosition(2);
      }
      else if (position === 2){
        setPosition(4);
      }
      else {
        setPosition(position-3);
      }
    }
    else{
      setImageList(prevList => {
        const newList = [...prevList];
        const firsrImage = newList.shift();
        newList.push(firsrImage);
        const secondImage = newList.shift();
        newList.push(secondImage);
        return newList;
    });
    if (position === 4){
      setPosition(0);
    }
    else if (position === 3){
      setPosition(4);
    }
    else{
      setPosition(position+1);
    }
    }
  }

  const handleDotIcons = () => {
    if (position === 4){
      setPosition(0);
    }
    else {
      setPosition(position+1);
    } 
  }
    useEffect(() => {
        window.addEventListener('resize', function() {
          setWindowWidth(window.innerWidth)
        });
      }); 

    useEffect(() => {
        const interval = setInterval(handleSliding, 4000);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      handleDotIcons();
    },[imageList])

    return (
      <div className={`mt-6 w-${windowWidth}`}>
          <h1 className={`${windowWidth <= 412 ? `text-3xl` : (windowWidth <= 1440 ? `text-4xl`: `text-5xl`)} font-bold flex item-center justify-center mt-12`}>Featured Products</h1>
          <h1 className='flex item-center justify-center mt-2'>Explore and discover a variety of products</h1>
          <div className={`flex item-center justify-center ${windowWidth <= 1025 ? `mt-[80px]`:`mt-[100px]`}`}>
              {imageList.map((key, index) => {
                  if (windowWidth <= 600) {
                      if (index === 2) {
                          return (
                              <button key={index} className={`${imagePointer === index ? `z-30` : (Math.abs(imagePointer-index) === 1 ? `z-20`: `z-10`)}`}
                              onClick={() => {handleImageClicked(index)}}
                              >
                                  <img className={`h-64 w-[178px] ${imagePointer === index ? `scale-150 z-30` : (Math.abs(imagePointer-index) === 1 ? `scale-125 z-20`: `z-10`)} + rounded-md`} src={key} alt="failed to load" />   
                              </button>
                          );
                      } else {
                          return null;
                      }
                  } else if (windowWidth <= 910){
                    if (index != 0 && index != 4){
                      return (
                        <button key={index} className={`${imagePointer === index ? `z-30` : (Math.abs(imagePointer-index) === 1 ? `z-20`: `z-10`)}`}
                          onClick={() => {handleImageClicked(index)}}
                        >
                              <img className={`h-64 w-[178px] ${imagePointer === index ? `scale-150 z-30` : (Math.abs(imagePointer-index) === 1 ? `scale-125 z-20`: `z-10`)} + rounded-md`} src={key} alt="failed to load" />   
                          </button>
                      )
                    }
                    else{
                      return null;
                    }
                  }else {
                      return (
                          <button key={index} className={`${imagePointer === index ? `z-30` : (Math.abs(imagePointer-index) === 1 ? `z-20`: `z-10`)}`}
                          onClick={() => {handleImageClicked(index)}}
                          >
                              <img className={`h-64 w-[178px] ${imagePointer === index ? `scale-150 z-30` : (Math.abs(imagePointer-index) === 1 ? `scale-125 z-20`: `z-10`)} + rounded-md`} src={key} alt="failed to load" />   
                          </button>
                      );
                  }
              })}
          </div>
          
          <div className={`flex text-slate-800 item-center justify-center ${windowWidth <= 1025 ? `mt-[80px]`:`mt-[100px]`}`}>
              <button className='mr-4'
                onClick={handleSlidingBack}
              >
                  <AiFillCaretLeft/>
              </button>
              
              <div className='flex'>
                {[...Array(5).keys()].map(i => (
                  <div key={i} className={`${i === position ? `text-blue-400` : `text-gray-600`}`}>
                    <GoDotFill/>
                  </div>
                ))}
              </div>
              
              <button className='ml-4'
                onClick={handleSliding}
              >
                  <AiFillCaretRight/>
              </button>
  
          </div>
      </div>
  );
  
}

export default Carousel
