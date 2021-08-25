export interface ICityInfo{
  titles: string;
  id: string;
  thumnail: string;
  is_pinned?: boolean;
  room_id: string;
}
export const DefaultCity: ICityInfo = {
  id: '', 
  titles: '', 
  room_id: '' ,
  thumnail: '',
};