import axios from "axios";

export async function getDependencies(name, version) {
  let url = `http://localhost:8000/getModuleDependencies/${name}/${version}`;
  const res = await axios.get(url);
  return res.data.dependencies.map(([name, version]) => ({name, version}));
}
