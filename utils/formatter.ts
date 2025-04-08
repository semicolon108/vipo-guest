import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Bangkok');

export const formatCurrency = (amount: any) => {

    const numRE = /\d/;
    const isNumeric = numRE.test(amount)
    
    return isNumeric ? new Intl.NumberFormat().format(parseInt(amount)) : ''
}


export const formatStringToDate = (dateStr: string) => {
    //return 'eiei'
    return dayjs(dateStr).toDate()
   
}

export const formatDate = (dateStr: string) => {
    //return 'eiei'
    return dayjs(dateStr).toDate()
   
}



export const formatMonthAndYear = (date: any) => {
    //return 'eiei'
    return date ?  dayjs(new Date(date))
    .format('MM/YYYY') : ''
}

export const formatFullDate = (date: any) => {
    //return 'eiei'
    return date ?  dayjs(new Date(date))
        .format('MMM DD, YYYY') : ''
}

export const formatMonthAndYearWithoutSlash = (date: any) => {
    //return 'eiei'
    return date ?  dayjs(new Date(date))
    .format('MMYYYY') : ''
}


export const formatDefaultDate = (date: any) => {
    //return 'eiei'
    return date ?  dayjs(new Date(date))
        .format('DD-MM-YYYY') : ''
}


export const minutesToTimeString = (minutes: number): string => {
    const hour24 = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hour12)}:${pad(minute)} ${ampm}`;
};
