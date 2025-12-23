export class LoanDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createHighRiskRequest(): LoanDto {
    return new LoanDto(
      100,
      0,
      17,
      true,
      1000,
      12,
    )
  }

  static createMediumRiskRequest(): LoanDto {
    return new LoanDto(
      20000,
      0,
      30,
      true,
      500,
      6,
    )
  }


  static createLowRiskRequest(): LoanDto {
    return new LoanDto(
      20000,
      0,
      30,
      true,
      500,
      12,
    )
  }





}