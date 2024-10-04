import React from 'react';
import { GoPersonFill } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa6';
import { useMediaQuery } from 'usehooks-ts';

type Props = {
  index: number;
  title: string;
  isDone: boolean;
  totalSteps: number;
};

const ProcessIcon: React.FC<Props> = (props: Props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  return (<>
  {isDesktop ?
      (<li
      className={`flex w-full relative ${props.isDone ? 'text-bluePrimary after:bg-bluePrimary' : 'text-slate-500 after:bg-slate-500'} ${props.index < props.totalSteps-1 ? "after:w-full": ""} after:content-['']  after:h-0.5   after:inline-block after:absolute lg:after:top-4 after:top-3 after:left-10`}>
      <div className="block whitespace-nowrap z-10">
        <span
          className={`w-6 h-6 ${props.isDone ? 'bg-bluePrimary border-bluePrimary' : 'bg-white'} border-2  rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-8 lg:h-8`}>
          {props.isDone ? <FaCheck /> : <GoPersonFill color='black'/>}
        </span>{' '}
        <span className='lg:text-xs md:text-xs flex '>{props.title}</span>
      </div>
    </li>)
      :
      (
        <li className={`relative flex-1 after:content-[''] ${props.index < props.totalSteps-1 ? "after:h-full": ""}  after:w-0.5   ${props.isDone ? 'after:bg-bluePrimary' : ' after:bg-slate-500'} after:inline-block after:absolute after:-bottom-8 after:left-[15px] lg:after:left-5`}>
          <div  className="flex items-center font-medium w-full  ">
              <span className={`w-8 h-8 ${props.isDone ? 'bg-bluePrimary' : 'text-slate-500 border-slate-500'} border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10`}>
              {props.isDone ? <FaCheck /> : <GoPersonFill color='black'/>}
              </span>
              <div className="block">
                  <div className={`text-sm font-primary ${props.isDone ? 'text-bluePrimary' : 'text-slate-500'}`}>{props.title}</div>
              </div>
          </div>
      </li>
      )}
  </>
    
    
  );
};

export default ProcessIcon;
