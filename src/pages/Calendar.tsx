
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/calendar/EventCard";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const events = [
  {
    id: "1",
    title: "Python Programming Session",
    datetime: "Today, 3:00 PM - 4:30 PM",
    location: "Library Study Room 204",
    description: "Introduction to Python variables, data types, and basic syntax.",
    category: "Computer Science",
    participantInitials: "PT",
    isAnonymous: true,
  },
  {
    id: "2",
    title: "Public Speaking Practice",
    datetime: "Tomorrow, 2:00 PM - 3:00 PM",
    location: "Communication Building, Room 110",
    description: "Working on presentation techniques and overcoming stage fright.",
    category: "Communication",
    participantInitials: "PS",
    isAnonymous: true,
  },
  {
    id: "3",
    title: "Guitar Lesson",
    datetime: "May 18, 5:00 PM - 6:00 PM",
    location: "Music Hall, Practice Room 3",
    description: "Learning basic chords and strumming patterns for beginners.",
    category: "Music",
    participantInitials: "GS",
    isAnonymous: false,
  }
];

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(1);
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(1);
  };
  
  const renderCalendarDays = () => {
    const blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(
        <div key={`blank-${i}`} className="h-10 w-10"></div>
      );
    }
    
    const daysArray = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      const isToday = 
        date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear();
      
      const isSelected = d === selectedDate;
      
      // Check if date has events
      const hasEvents = events.some(event => {
        const eventDate = new Date(event.datetime.includes("Today") 
          ? today 
          : event.datetime.includes("Tomorrow") 
          ? new Date(today.getTime() + 86400000)
          : new Date(event.datetime.split(",")[0] + " " + currentYear));
        
        return (
          eventDate.getDate() === d &&
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear
        );
      });
      
      daysArray.push(
        <button
          key={d}
          className={`h-10 w-10 rounded-full flex items-center justify-center relative ${
            isSelected 
              ? "bg-primary text-primary-foreground" 
              : isToday 
              ? "border-2 border-primary" 
              : "hover:bg-muted"
          }`}
          onClick={() => setSelectedDate(d)}
        >
          {d}
          {hasEvents && (
            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent"></span>
          )}
        </button>
      );
    }
    
    return [...blanks, ...daysArray];
  };
  
  // Filter events for selected date
  const filteredEvents = events.filter(event => {
    const selectedDateObj = new Date(currentYear, currentMonth, selectedDate);
    const formattedSelectedDate = selectedDateObj.toDateString();
    
    if (event.datetime.includes("Today")) {
      return formattedSelectedDate === today.toDateString();
    } else if (event.datetime.includes("Tomorrow")) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return formattedSelectedDate === tomorrow.toDateString();
    } else {
      const eventMonth = months.findIndex(month => event.datetime.includes(month));
      const eventDay = parseInt(event.datetime.split(" ")[1].replace(",", ""));
      
      return eventMonth === currentMonth && eventDay === selectedDate;
    }
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            New Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {months[currentMonth]} {currentYear}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>
              
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full border-2 border-primary"></div>
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 relative">
                    <span className="absolute bottom-0 left-1 h-1 w-1 rounded-full bg-accent"></span>
                  </div>
                  <span>Event</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Daily Schedule */}
          <div>
            <div className="bg-card rounded-lg border shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">
                  {months[currentMonth]} {selectedDate}, {currentYear}
                </h2>
              </div>
              
              {filteredEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No events scheduled for this day</p>
                  <Button className="mt-4" variant="outline">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Calendar;
