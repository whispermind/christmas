export interface Istate {
  readonly shape: string[];
  readonly color: string[];
  readonly size: string[];
  readonly like: string[];
  amountSlider: string[];
  yearsSlider: string[];
  sort: string;
  likedOnly: boolean;
}
const state: Istate = {
  shape: [],
  color: [],
  size: [],
  like: [],
  amountSlider: [],
  yearsSlider: [],
  sort: '1',
  likedOnly: false,
};
export default state;
