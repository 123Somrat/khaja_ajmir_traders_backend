import dayjs from "dayjs";

// Function to determine greeting based on time of day
const getGreetingTime = ():string => {
    const hour = dayjs().hour();
    return hour < 12 ? 'morning' : 'evening';
  }


  export default getGreetingTime;