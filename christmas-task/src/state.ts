export interface Istate {
  readonly shape: string[];
  readonly color: string[];
  readonly size: string[];
  readonly like: string[];
  amountSlider: string[];
  yearsSlider: string[];
  sort: string;
  likedOnly: boolean;
  played: boolean;
  snowflakes: boolean;
  tree: number;
  background: number;
  lights: boolean;
  lightsColor: string;
}
const state: Istate = {
  shape: [],
  color: [],
  size: [],
  like: [],
  amountSlider: [],
  yearsSlider: [],
  sort: "1",
  likedOnly: false,
  played: false,
  snowflakes: false,
  tree: 1,
  background: 1,
  lights: false,
  lightsColor: "red",
};
export default state;
