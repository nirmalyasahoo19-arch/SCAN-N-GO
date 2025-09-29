"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// The DayPicker component has been removed as it is not compatible with React 19 yet.
// This is a placeholder component to avoid breaking the build.

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<any>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3 border rounded-md", className)}>
      <p className="text-muted-foreground">Calendar component is temporarily disabled due to dependency issues.</p>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
