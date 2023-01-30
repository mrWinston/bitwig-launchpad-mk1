import { Color } from "../utils";
import { Button } from "./button";

const PAGE_SELECT_ACTIVE_COLOR: Color = Color.LIME
const PAGE_SELECT_STANDBY_COLOR: Color = Color.AMBER_LOW

export class PageSelectButton extends Button {
  myNumber: number
  pageNumber: API.SettableRangedValue

  constructor(myNumber: number, pageNumber: API.SettableRangedValue) {
    super()
    this.myNumber = myNumber
    this.pageNumber = pageNumber

    this.pageNumber.addRawValueObserver(this.pageChanged)
    this.setColor(PAGE_SELECT_STANDBY_COLOR)
  }

  public pressed = () => {
    this.pageNumber.setRaw(this.myNumber)
  }
  released(): void {
    throw new Error("Method not implemented.");
  }

  public pageChanged = (newPage: number) => {
    this.setColor(newPage == this.myNumber ? PAGE_SELECT_ACTIVE_COLOR : PAGE_SELECT_STANDBY_COLOR)
  }

}
