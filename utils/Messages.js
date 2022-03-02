export const Messages = []

export const formatMessage = (user,text,channel) => {
  const date = new Date;

  let minutes = date.getMinutes();

  if(minutes < 10){
    minutes = `0${minutes}`
  }
  
  let hour = date.getHours();
  
  if(hour < 10){
    hour = `0${hour}`
  }

  return {
    user,
    text,
    channel,
    time: `${hour}:${minutes}`
  }
}

export const getMessagesFromChannel = channel => {
  return Messages.filter(msg => msg.channel == channel)
}