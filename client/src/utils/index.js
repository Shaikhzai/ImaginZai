import {surpriseMePrompts} from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt){
    const reandomIndex= Math.floor(Math.random()*
    surpriseMePrompts.length);
    const randomPrompt= surpriseMePrompts[reandomIndex]
//to make sure the propmt is not repeted
    if(randomPrompt===prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

//downloading img
export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}