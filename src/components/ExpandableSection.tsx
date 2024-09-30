import React, { FC, useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ArrowDown } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const ExpandableSection: FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <Collapsible
      className="ring-1 ring-slate-400 px-4 py-3 rounded-lg"
      open={isOpen}
      onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between space-x-4 w-[600px]">
        <h1 className="text-lg font-semibold">{title}</h1>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => setIsOpen(!isOpen)}>
            <ArrowDown
              color="gray"
              size={25}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="CollapsibleContent">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default ExpandableSection;
