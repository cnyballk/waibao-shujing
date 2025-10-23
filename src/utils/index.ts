import { baseApi } from "@/axios";

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