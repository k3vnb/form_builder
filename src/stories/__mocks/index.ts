const formatUserName = (name: string) => '@' + name.split(' ').map((n,i) => (n.charAt(0).toLowerCase() + (i === 0 ? '' : n.slice(1)))).join('');
const disableSomeOptions = (options: any[]) => options.map((o, i) => ({ ...o, disabled: (i+1) % 4 === 0 }));
const addUserNamesAsDescriptions = (options: any[]) => options.map((o) => ({ ...o, description: formatUserName(o.display) }));

export const userLists = {
  default: [
    { id: '1', display: 'Tom Cooper' },
    { id: '2', display: 'Syd Richmond' },
    { id: '3', display: 'Derrick Lowry' },
    { id: '4', display: 'Tom Cook' },
    { id: '5', display: 'Ayesha McLaughlin' },
    { id: '6', display: 'Curtis Mathis' },
    { id: '7', display: 'Helen Hilton' },
    { id: '8', display: 'Mark Sharpe' },
    { id: '9', display: 'Lucie Turner' },
    { id: '10', display: 'Effie Hancock' },
  ],
  empty: [],
  get withDescriptions() {
    return addUserNamesAsDescriptions(this.default);
  },
  get withSomeDisabled() {
    return disableSomeOptions(this.default);
  }
};
