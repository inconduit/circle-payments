const generateUniqueId = (existingIds: string[]) => {
  const createId = () => Math.random().toString(36).substr(2, 9);
  let id = createId();

  while (existingIds.includes(id)) {
    id = createId();
  }
  return id;
};

export default generateUniqueId;
