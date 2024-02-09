"use client"
import "./schedule.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import MainController from "../../../Backend/Controller/MainController";
import { useUser } from "../user/user";

export default function Page() {
  const currentDate = new Date();
  const User = useUser();
  const [existingEvents, setExistingEvents] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [scheduleType, setScheduleType] = useState("Mes");
  const [weekDay, setWeekDay] = useState((currentDate.getDay()+6)%7); 
  const [scheduleData, setScheduleData] = useState([]);
  const controller = new MainController();
  const availableHours = [8, 9, 10, 11, 12, 14, 15, 16, 17, 18];
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  useEffect(() => {
    async function getEvents() {
      const events = await controller.getAllEvents();
      setExistingEvents(events);
    }
    getEvents();
  }, [])

  useEffect(() => {
    setSchedule(selectedMonth, selectedDate);
  }, [selectedYear, selectedMonth, selectedDate, scheduleType]);

  function setSchedule(month, day) {
    if (scheduleType === "Día") {
      setScheduleData([[day], [], []]);
    } else {
      const weeks = [];
      const daysInMonth = new Date(selectedYear, month+1, 0).getDate();
      const firstDayOfMonth = (new Date(selectedYear, month, 1).getDay()+6)%7;
      const lastDayOfMonth = (new Date(selectedYear, month+1, 0).getDay()+6)%7;
      const daysInLastMonth = new Date(selectedYear, month, 0).getDate();
      let currentWeek = [];
      if (scheduleType === "Mes") {
        for (let i = 0; i < firstDayOfMonth; i++) {
          currentWeek = [daysInLastMonth - i, ...currentWeek];
        }
        weeks.push([...currentWeek]);
        currentWeek = []

        for (let i = 1; i <= daysInMonth; i++) {
          currentWeek.push(i);
        }
        weeks.push([...currentWeek]);
        currentWeek = []

        for (let i = lastDayOfMonth + 1; i < 7; i++) {
          currentWeek.push(i - lastDayOfMonth);
        }
        weeks.push([...currentWeek]);
        
        setScheduleData(weeks)
      } else {
        const dayNumber = (new Date(selectedYear, month, day).getDay()+6) % 7;
        for(let i = 0; (day - dayNumber) + i < 1; i++) {
          currentWeek = [daysInLastMonth - i, ...currentWeek];
        }
        weeks.push([...currentWeek]);
        currentWeek = [];
        for(let i = 0; (day - dayNumber) + i <= daysInMonth && i < 7; i++) {
          if((day - dayNumber) + i < 1) {
            continue;
          }
          currentWeek.push((day - dayNumber) + i)
        }
        weeks.push([...currentWeek]);
        currentWeek = [];
        for(let i = 0; i < 6; i++) {
          if((day - dayNumber) + i < daysInMonth) {
            continue;
          }
          currentWeek.push(((day - dayNumber) + i + 1) - daysInMonth)
        }
        weeks.push([...currentWeek]);
        setScheduleData(weeks)
      }
    }
  }

  function handleLeft() {
    if(scheduleType === "Mes") {
      setSelectedDate(1); 
      setWeekDay((new Date(selectedYear, selectedMonth-1, 1).getDay()+6)%7); 
      if(selectedMonth > 0){
        setSelectedMonth(selectedMonth-1)
      } else {
        setSelectedYear(selectedYear-1); setSelectedMonth(11)
      }
    } else if (scheduleType === "Semana") {
      if(selectedDate-7 > 0) {
        setWeekDay((new Date(selectedYear, selectedMonth-1, selectedDate-7).getDay()+6)%7);   
        setSelectedDate(selectedDate-7); 
      } else {
        setSelectedDate(new Date(selectedYear, selectedMonth, selectedDate-7).getDate());
        setWeekDay(new Date(selectedYear, selectedMonth, selectedDate-7).getDay());
        if(selectedMonth > 0){
          setSelectedMonth(selectedMonth-1)
        } else {
          setSelectedYear(selectedYear-1); setSelectedMonth(11)
        }
      }
    } else {
      if(selectedDate-1 > 0) {
        setSelectedDate(selectedDate-1); 
        setWeekDay((new Date(selectedYear, selectedMonth, selectedDate-1).getDay()+6)%7);   
      } else {
        setSelectedDate(new Date(selectedYear, selectedMonth, 0).getDate());
        setWeekDay((new Date(selectedYear, selectedMonth, 0).getDay()+6)%7);
        if(selectedMonth > 0){
          setSelectedMonth(selectedMonth-1)
        } else {
          setSelectedYear(selectedYear-1); setSelectedMonth(11)
        }
      }
    }
  }

  function handleRight() {
    if(scheduleType === "Mes") {
      setSelectedDate(1); 
      setWeekDay((new Date(selectedYear, selectedMonth+1, 1).getDay()+6)%7); 
      if(selectedMonth < 11){
        setSelectedMonth(selectedMonth+1)
      } else {
        setSelectedMonth(0); setSelectedYear(selectedYear+1);
      }
    } else if (scheduleType === "Semana") {
      if(selectedDate+7 <= new Date(selectedYear, selectedMonth+1, 0).getDate()) {
        setWeekDay((new Date(selectedYear, selectedMonth+1, selectedDate+7).getDay()+6)%7);   
        setSelectedDate(selectedDate+7); 
      } else {
        setWeekDay(new Date(selectedYear, selectedMonth, selectedDate+7).getDay());
        setSelectedDate(new Date(selectedYear, selectedMonth, selectedDate+7).getDate());
        if(selectedMonth < 11){
          setSelectedMonth(selectedMonth+1)
        } else {
          setSelectedMonth(0); setSelectedYear(selectedYear+1);
        }
      }
    } else {
      if(selectedDate+1 <= new Date(selectedYear, selectedMonth+1, 0).getDate()) {
        setWeekDay((new Date(selectedYear, selectedMonth, selectedDate+1).getDay()+6)%7);   
        setSelectedDate(selectedDate+1); 
      } else {
        setWeekDay((new Date(selectedYear, selectedMonth+1, 1).getDay()+6)%7);
        setSelectedDate(1);
        if(selectedMonth < 11){
          setSelectedMonth(selectedMonth+1)
        } else {
          setSelectedMonth(0); setSelectedYear(selectedYear+1);
        }
      }
    }
  }

  function lastHour(date, hour) {
    if(availableHours.indexOf(hour) == 0) {
      const editDate = new Date(date.year, date.month, date.day-1);
      existingEvents.forEach(event => {
        if(event.day === editDate.getDate(), event.month === editDate.getMonth(), event.year === editDate.getFullYear(), event.dayOfWeek === editDate.getDay()) {
          return null;
        }
      });
      return [{day:editDate.getDate(), month:editDate.getMonth(), year:editDate.getFullYear(), dayOfWeek:editDate.getDay()}, 18]
    }
    return [date, availableHours[availableHours.indexOf(hour) - 1]];
  }

  function nextHour(date, hour) {
    if(availableHours.indexOf(hour) == availableHours.length-1) {
      const editDate = new Date(date.year, date.month, date.day+1);
      existingEvents.forEach(event => {
        if(event.day === editDate.getDate(), event.month === editDate.getMonth(), event.year === editDate.getFullYear(), event.dayOfWeek === editDate.getDay()) {
          return null;
        }
      });
      return [{day:editDate.getDate(), month:editDate.getMonth(), year:editDate.getFullYear(), dayOfWeek:editDate.getDay()}, 8]
    }
    return [date, availableHours[availableHours.indexOf(hour) + 1]];
  }

  function handleEditEvent(id, date, hour, edit) {
    let updatedHour;
    let updatedDate;
    if(edit < 0) {
      [updatedDate, updatedHour] = lastHour(date, hour);
    } else {
      [updatedDate, updatedHour] = nextHour(date, hour);
    }
    controller.editEvent(id, updatedDate, updatedHour);
  }

  function handleRemoveEvent(id) {
    controller.deleteEvent(id);
  }

  function DayCard({day, index, isCurrentDate}) {
    const cardClasses = index === 1
      ? selectedMonth == currentDate.getMonth() && isCurrentDate
        ? "day_card clr_dark bg_dark order_vertically"
        : "day_card clr_shadow bg_shadow order_vertically"
      : "day_card clr_shadow bg_bg order_vertically";
    const labelColor = selectedMonth == currentDate.getMonth() && isCurrentDate ? "clr_shadow" : "clr_dark";
    const lineColor = selectedMonth == currentDate.getMonth() && isCurrentDate ? "bg_shadow" : "bg_dark";
    const dayEventsList = existingEvents.filter(event => {
      const dayDate = new Date(selectedYear, selectedMonth + (index - 1), day);
      if(event.date.day === day &&
        event.date.month === dayDate.getMonth() &&
        event.date.year === dayDate.getFullYear()) {
          return (
            event
          );
        }
    });
    
    return (
      <div className={cardClasses}>
        <h3 className={labelColor + " unselectable"}>{day}</h3>
        <div className={lineColor} style={{ width: "80%", height: "0.2rem", borderRadius: "1rem" }} />
        {scheduleType !== "Mes" ? (
          <div className="events_container">
            {availableHours.map(hour => {
              const eventsForHour = dayEventsList.filter(event => event.hour === hour);

              return (
                <div key={hour}>
                  {eventsForHour.map(event => (
                    <>{event.id ? <div key={event.purchaseId} className={!labelColor + " " + lineColor + " event"}>
                      <Link class="material-symbols-outlined unselectable clickable" href={"/post?id=" + event.purchaseId}>
                      visibility
                      </Link>
                      {User.privileges == "admin" ? <>
                        <span class="material-symbols-outlined unselectable clickable" onClick={()=>{handleEditEvent(event.id, event.date, event.hour, -1); [event.date, event.hour] = lastHour(event.date, event.hour); setUpdate(!update)}}>
                        arrow_upward
                        </span>
                        <span class="material-symbols-outlined unselectable clickable" onClick={()=>{handleEditEvent(event.id, event.date, event.hour, 1); [event.date, event.hour] = nextHour(event.date, event.hour); setUpdate(!update)}}>
                        arrow_downward
                        </span>
                        <span class="material-symbols-outlined unselectable clickable" onClick={()=>{handleRemoveEvent(event.id); event.id = null; setUpdate(!update);}}>
                        delete
                        </span>
                      </> : null}
                    </div> : null}</>
                  ))}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };
  
  function renderMonthDays(month, index) {
    return month.map((day) => (
      <DayCard
        key={day}
        day={day}
        index={index}
        isCurrentDate={currentDate.getDate() === day && currentDate.getFullYear() === selectedYear}
      />
    ));
  };
  
  function renderDay() {
    const day = scheduleData[0][0];
    const isCurrentDate = currentDate.getDate() === day && currentDate.getFullYear() === selectedYear;
  
    return (
      <DayCard
        day={day}
        index={1}
        isCurrentDate={isCurrentDate}
      />
    );
  };
  
  function renderSchedule() {
    if (scheduleType !== "Día") {
      return (
        <>
          {scheduleData.map((month, index) => (
            <>
              {renderMonthDays(month, index)}
            </>
          ))}
        </>
      );
    } 
    return renderDay();
  };

  return (
    <main className="schedule_container order_vertically">
      <div className="schedule_top_bar bg_shadow">
        <div className="center_section">
          <Link href="/"><span className="material-symbols-outlined unselectable clr_dark" style={{fontSize:"2.5rem", margin:"0.3rem", marginRight:"5rem"}}>
            arrow_back
          </span></Link>
        </div>
        <div className="order_horizontally month_selection">
          <span style={{fontSize:"1.6rem"}} className="unselectable clr_dark material-symbols-outlined clickable" onClick={()=> handleLeft()}>
            chevron_left
          </span>
          <h2 className="clr_dark unselectable">
            {scheduleType !== "Mes" ? <>{selectedDate} de </> : null}{months[selectedMonth]} de {selectedYear}
          </h2>
          <span style={{fontSize:"1.6rem"}} className="unselectable clr_dark material-symbols-outlined clickable" onClick={() => handleRight()}>
            chevron_right
          </span>
        </div>
        <select id="Select_Schedule_Type" className="button bg_shadow clr_dark" style={{margin:"0.5rem", padding: "0.5rem", border: "0.2rem solid", fontWeight: "600"}} value={scheduleType} onChange={(e) => setScheduleType(e.target.value)}>
          <option id="Month">Mes</option>
          <option id="Week">Semana</option>
          <option id="Day">Día</option>
        </select>
      </div>
      <div className="hour_days_container">
        {scheduleType !== "Mes" ? 
          <div className="hour_container clr_dark">
            <span className="day_name">Horas</span>
            <span className="bg_dark hour_bar" ></span>
            <p>8:00</p>
            <p>9:00</p>
            <p>10:00</p>
            <p>11:00</p>
            <p>12:00</p>
            <p>14:00</p>
            <p>15:00</p>
            <p>16:00</p>
            <p>17:00</p>
            <p>18:00</p>
          </div> 
        : null}
        <div className={"day_container " + (scheduleType === "Mes" ? "month" : scheduleType === "Semana" ? "week" : "day")}>
          <>{scheduleType !== "Día" ? 
            <>
              <span className="day_name">Lunes</span>
              <span className="day_name">Martes</span>
              <span className="day_name">Miércoles</span>
              <span className="day_name">Jueves</span>
              <span className="day_name">Viernes</span>
              <span className="day_name">Sábado</span>
              <span className="day_name">Domingo</span>
            </>:
              <span className="day_name">{days[weekDay]}</span>
          }</>
          <>{renderSchedule()}</>
        </div>
      </div>
    </main>
  )
}