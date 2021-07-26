import { Component } from '@angular/core';
import { variants } from './core/constants/variants';
import { Result } from './core/models/result.model';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  result: Result[] = [];
  userScore = 0;
  computerScore = 0;

  get variants() { return variants; }
  
  doSelection(userSelection: string): void {
    const computerSelection = this.makeComputerChoice();
    let isUserWinner = this.isWinner(userSelection, computerSelection);
    let isComputerWinner = this.isWinner(computerSelection, userSelection);
    let winner = this.getWinner(isUserWinner, isComputerWinner);
    
    this.result.unshift({
      user: userSelection,
      computer: computerSelection,
      winner: winner
    });
  }

  isWinner(userSelection: string, computerSelection: string): boolean {
    return this.variants.find(elem => elem.emoji === userSelection).beats === computerSelection;
  }

  private getWinner(isUserWinner: boolean, isComputerWinner: boolean) {
    let winner: string;
    if(!isUserWinner || !isComputerWinner) {
      if (isUserWinner) {
        this.userScore++;
        return winner = 'user';
      } else if (isComputerWinner) {
        this.computerScore++;
        return winner = 'computer';
      } else {
        return winner = 'nobody';
      }
    }
  }

  private makeComputerChoice(): string {
    const randomIndex = Math.floor(Math.random() * this.variants.length);
    return this.variants[randomIndex].emoji;
  }
}
