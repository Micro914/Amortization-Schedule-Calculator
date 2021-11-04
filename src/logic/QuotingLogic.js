import moment from 'moment';

export const calculateResults = ({loanAmount, loanTerm, interestRate, date, paymentMethod}) => {
   let results=""
   let term = Number(paymentMethod)
   const userAmount = Number(loanAmount);
   const calculatedInterest = Number(interestRate) / 100 / term;
   const calculatedPayments = Number(loanTerm) * term;
   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
   const monthly = (userAmount * x * calculatedInterest) / (x - 1);

   if (isFinite(monthly)) {
     const monthlyPaymentCalculated = Number(monthly);
     const totalPaymentCalculated = Number((monthly * calculatedPayments).toFixed(2));
     const totalInterestCalculated = Number((monthly * calculatedPayments - userAmount).toFixed(2));

//      // Set up results to the state to be displayed to the user
        results= {
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
        }
   }
   return results;
    };

export const addMonth = (d,index, period) => {
     let currentDate = moment(d);
     let nextMonthDate = moment(d).add(1, 'months');
     let futureMonth = moment(nextMonthDate).add((index)*(period), 'months');
     let futureMonthEnd = moment(futureMonth).endOf('month');
     
     if(currentDate.date() !== futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
         futureMonth = futureMonth.add(-1, 'd');
     }
     return futureMonth.format('MM-DD-YYYY')
 };

 export const getYear = (index, terms) => {
    let period = (index+1) / terms
    return Math.ceil(period)
}

export const interestMonthly = (interestRate, loanAmount, nf) => {
    let userAmount = loanAmount
    let calculatedInterest = interestRate ;
    let interestMonthly = ((userAmount * calculatedInterest)).toFixed(2);
    return "$"+nf.format(interestMonthly)
}

export const newPrincipal = (interestRate, loanAmount, monthlyPayment,nf) => {
    let userAmount = loanAmount
    let calculatedInterest = interestRate;
    let interestMonthly = ((userAmount * calculatedInterest));
    let principal = (monthlyPayment - interestMonthly).toFixed(2)
    return "$"+(nf.format(principal))
}