export const daysLeft = (deadline: string | number | Date) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: string, raisedAmount: string) => {
  const percentage = Math.round((parseFloat(raisedAmount) * 100) / parseFloat(goal));

  return percentage;
};

export const checkIfImage = (url: string, callback: { (exists: any): Promise<void>; (arg0: boolean): void; }) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

export interface Donation {
  donator: string;
  donation: string;
}