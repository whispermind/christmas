export interface Istate {
  readonly shape: string[];
  readonly color: string[];
  readonly size: string[];
  readonly like: string[];
  sort: string;
  likedOnly: boolean;
}
const state: Istate = {
  shape: [],
  color: [],
  size: [],
  like: [],
  sort: '1',
  likedOnly: false,
};
export default state;
