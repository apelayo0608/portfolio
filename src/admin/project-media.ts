export const projectImagePath=(title:string,fileName:string)=>`projects/${title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}/${fileName.toLowerCase().replace(/[^a-z0-9.]+/g,'-')}`
