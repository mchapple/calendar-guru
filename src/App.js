// import logo from './chat.png'
import './App.css'
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from "react-datepicker";
import React, { useState } from "react"
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [ start, setStart ] = useState(new Date())
  const [ end, setEnd ] = useState(new Date())
  const [ eventName, setEventName ] = useState("")
  const [ eventDescription, setEventDescription ] = useState("")

  const session = useSession() // tokens
  const supabase = useSupabaseClient() // talk to supabase
  const { isLoading } = useSessionContext()
  
  if (isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar"
      }
    })
    if (error) {
      alert("Error logging in to Google provider with Supabase")
      console.log(error)
    }
  }

  async function createCalendarEvent() {
    console.log("Creating calendar event")
    const event = {
      "summary": eventName,
      "description": eventDescription,
      "start": {
        "dateTime": start.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      "end": {
        "dateTime": end.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        "Authorization":"Bearer "+ session.provider_token // access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your google calendar!")
    })
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {session ?
          <>
            <h2>Hey there {session.user.email}</h2>
            <p>Start of your event</p>
            <DatePicker
              selected={start}
              onChange={date => setStart(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"/>
            <p>End of your event</p>
            <DatePicker
              selected={end}
              onChange={date => setEnd(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa" />
            <p>Event Name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)}/>
            <p>Event Description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)}/>
            <hr/>
            <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>
            <p></p>
            <button onClick={() => signOut()}>Sign Out</button>

          </>
          :
          <>
            <button onClick={() => googleSignIn()}>Sign In With Google</button>
          </>
        }
      </div>
    </div>
  );
}

export default App;
