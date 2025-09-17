"use client"

import * as React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { cn } from "@/lib/utils"

// Single date selection props
export interface SingleCalendarProps {
  className?: string
  selected?: Date | null
  onSelect?: (date: Date | null) => void
  disabled?: (date: Date) => boolean
  mode?: "single"
  [key: string]: unknown
}

// Range date selection props
export interface RangeCalendarProps {
  className?: string
  selected?: Date | null
  startDate?: Date | null
  endDate?: Date | null
  onSelect?: (range: [Date | null, Date | null]) => void
  disabled?: (date: Date) => boolean
  mode: "range"
  [key: string]: unknown
}

export type CalendarProps = SingleCalendarProps | RangeCalendarProps

function Calendar(props: CalendarProps) {
  // Single mode (default)
  if (props.mode !== "range") {
    const { className, selected, onSelect, disabled, ...singleProps } = props

    return (
      <div className={cn("p-3", className)}>
        <DatePicker
          selected={selected}
          onChange={(date: Date | null) => onSelect?.(date)}
          filterDate={disabled ? (date: Date) => !disabled(date) : undefined}
          inline
          className="w-full"
          calendarClassName="!border-0 !shadow-none"
          {...singleProps}
        />
      </div>
    )
  }

  // Range mode
  const { className, selected, startDate, endDate, onSelect, disabled, ...rangeProps } = props

  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={selected}
        onChange={(range: [Date | null, Date | null]) => onSelect?.(range)}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        filterDate={disabled ? (date: Date) => !disabled(date) : undefined}
        selectsRange
        inline
        className="w-full"
        calendarClassName="!border-0 !shadow-none"
        {...rangeProps}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
