const tableData = [];
const sortOption = {};
class fakeData {
  constructor(size) {
    this.size = size || 2000;
    this.datas = [];
    this.sortKey = null;
    this.sortDir = null;
  }
  // dataModel(index) {
  //   return tableData[index];
  // }
  // getObjectAt(index) {
  //   if (index < 0 || index > this.size) {
  //     return undefined;
  //   }
  //   if (this.datas[index] === undefined) {
  //     this.datas[index] = this.dataModel(index);
  //   }
  //   return this.datas[index];
  // }
  // getAll() {
  //   if (this.datas.length < this.size) {
  //     for (let i = 0; i < this.size; i++) {
  //       this.getObjectAt(i);
  //     }
  //   }
  //   return this.datas.slice();
  // }

  getSize() {
    return this.size;
  }
  getSortAsc(sortKey, data) {
    this.datas = data;
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'ASC';
    return this.datas.sort(this.sort);
  }
  getSortDesc(sortKey, data) {
    this.datas = data;
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'DESC';
    return this.datas.sort(this.sort);
  }
  sort(optionA, optionB) {
    let typeA = typeof optionA[sortOption.sortKey];
    let typeB = typeof optionB[sortOption.sortKey];

    let valueA = null;
    let valueB = null;

    if (typeA === 'string') {
      valueA = optionA[sortOption.sortKey].toUpperCase();
    } else if (typeA === 'number') {
      valueA = optionA[sortOption.sortKey].toString().toUpperCase();
    }

    if (typeB === 'string') {
      valueB = optionB[sortOption.sortKey].toUpperCase();
    } else if (typeB === 'number') {
      valueB = optionB[sortOption.sortKey].toString().toUpperCase();
    }

    let sortVal = 0;
    if (valueA > valueB) {
      sortVal = 1;
    }
    if (valueA < valueB) {
      sortVal = -1;
    }
    if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
      return sortVal * -1;
    }
    return sortVal;
  }
}
export default fakeData;
