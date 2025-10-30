import { baseApi } from "@/axios";
import { getLocalStoreConfig } from "@/setting";

export const getImageUrl = (url: string) => {
  return `${baseApi}${url}`;
};

export const getTreeData = (data: any[]) => {
  return data.map((item) => {
    return {
      id: item.id,
      title: item.label,
      label: item.label,
      value: item.id,
      children: item.children ? getTreeData(item.children) : [],
    };
  });
};
export const flattenTreeData = (data: any[]) => {
  const result = [];
  data.forEach((item) => {
    result.push({
      id: item.id,
      label: item.label,
      value: item.id,
    });
    if (item.children) {
      result.push(...flattenTreeData(item.children));
    }
  });
  return result;
};
export const getTreeLabel = (data: any[], value: string) => {
  return flattenTreeData(data).find((item) => item.id === value)?.label;
};

export const myUploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(baseApi + "/common/upload", {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "multipart/form-data",
      "authorization": "Bearer " + getLocalStoreConfig("TOKEN"),
    },
  }).then((res) => res.json());
};
export const getSizeLabel = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)}${units[unitIndex]}`;
}