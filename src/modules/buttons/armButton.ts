import { Color } from "../utils";
import { Button } from "./button";

export class ArmButton extends Button {
  arm: API.SettableBooleanValue
  
  constructor(arm: API.SettableBooleanValue){
    super()
    this.arm = arm
    arm.addValueObserver((isArmed: boolean) => {
      this.setColor(isArmed ? Color.RED_FULL : Color.RED_LOW)
    })

  }

  pressed(): void {
    println(`Arm Pressed`)
    this.arm.toggle()
  }
  released(): void {
  }

}
