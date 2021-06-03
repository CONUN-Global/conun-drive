function makeURLCool(fileID: string | number) {
  let s = "";
  while (s.length < 6)
    s += Math.random()
      .toString(36)
      .substr(2, 6 - s.length);

  return btoa(`${s}-conun-drive-file%${fileID}`);
}

export default makeURLCool;
