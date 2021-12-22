export interface Istate {
  readonly shape: string[];
  readonly color: string[];
  readonly size: string[];
  readonly like: string[];
  likedOnly: boolean;
}
const state: Istate = {
  shape: [],
  color: [],
  size: [],
  like: [],
  likedOnly: false,
};
export default state;
