export const getStaleTime = (staleTime: number) => {
  const current = new Date();
  const after = new Date(current.getTime() + staleTime);

  return after;
};

export const isStaled = (targetTime: Date) => {
  const current = new Date();

  if (targetTime.getTime() > current.getTime()) {
    return false;
  }

  return true;
};
