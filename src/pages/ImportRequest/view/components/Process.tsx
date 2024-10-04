import React from 'react';
import ProcessIcon from './ProcessIcon';
import { useMediaQuery } from 'usehooks-ts';

type Props = {};

const dataIcon = [
  {
    title: 'Import Request',
    isDone: true
  },
  {
    title: 'Quality Inspection',
    isDone: true
  },
  {
    title: 'Purchase Confirmation',
    isDone: false
  },
  {
    title: 'Request Processing',
    isDone: false
  },
  {
    title: 'Request Closed',
    isDone: false
  }
];
const Process = (props: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="font-primary font-bold text-2xl mb-4">Process</div>
      {isDesktop ?
      (<ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
        {dataIcon.map((item, index) => (
          
            <ProcessIcon index={index} title={item.title} isDone={item.isDone} totalSteps={dataIcon.length}/>
        ))}
      </ol>)
      :
      (<ol className=" overflow-hidden space-y-8">
        {dataIcon.map((item, index) => (

            <ProcessIcon index={index} title={item.title} isDone={item.isDone} totalSteps={dataIcon.length}/>

        ))}
      </ol>)}
      
    </div>
  );
};

export default Process;
