export const Roles = [
  {
    value: '',
    label: 'Account Type...'
  },
  {
    value: 'Customer',
    label: 'Customer'
  },
  {
    value: 'Manager',
    label: 'Manager'
  }
];

export const multiQty = [
  { label: '50', value: '50' }, //0
  { label: '100', value: '100' }, //1
  { label: '200', value: '200' }, //2
  { label: '300', value: '300' }, //3
  { label: '500', value: '500' }, //4 ->
  { label: '1000', value: '1000' }, //5
  { label: '2000', value: '2000' }, //6 ->
  { label: '3000', value: '3000' }, //7
  { label: '5000', value: '5000' } //8
];

export const products = [
  { value: '', label: 'select...' },
  { value: 'EMB', label: 'Emblems' },
  // { value: "Peel-N-Stick Embroidery", label: "Peel-N-Stick Embroidery" },
  { value: 'Embroidered KeyFobs', label: 'Embroidered KeyFobs' },
  { value: 'Woven 3D Puff Key Fobs', label: 'Woven 3D Puff Key Fobs' },
  { value: 'Embriodered Bag Tags', label: 'Embriodered Bag Tags' },
  { value: 'Embriodery Book Mark', label: 'Embriodery Book Mark' },
  { value: 'Leather', label: 'Leather' },
  { value: 'Lapel Pins', label: 'Lapel Pins' },
  { value: 'Lanyards', label: 'Lanyards' }
];

export const materials = [
  { value: '', label: 'select...' },
  { value: 'EMB/MAT: Full Embroidery', label: 'Full Embriodery' },
  { value: 'EMB/MAT: Twill', label: 'Twill' },
  { value: 'EMB/MAT: Dye Sub 100% Embroidered', label: 'Dye Sub 100% Embriodered' },
  { value: 'EMB/MAT: Dye Sub 100% Twill', label: 'Dye Sub 100% Twill' },
  { value: 'EMB/MAT: Woven', label: 'Woven' },
  {
    value: 'EMB/MAT: Embroidery / Dye Sublimation Combination',
    label: 'Embriodery / Dye Sublimation Combination'
  },
  { value: 'EMB/MAT: Embroidery / Woven Combination', label: 'Embriodery / Woven Combination' },
  { value: 'EMB/MAT: Faux leather', label: 'Faux Leather' }
];

export const backings = [
  { value: '', label: 'select...' },
  { value: 'EMB/BAC: Plastic (sew on)', label: 'Plastic (sew on)' },
  { value: 'EMB/BAC: Heat Seal (iron on)', label: 'Heat Seal (iron on)' },
  {
    value: 'EMB/BAC: Peel-N-Stick Embroidery™ (stick on)',
    label: 'Peel-N-Stick Embroidery(stick on)'
  },
  { value: 'EMB/BAC: Velcro', label: 'Velcro' },
  { value: 'EMB/BAC: Cork (coaster)', label: 'Cork(coaster)' },
  { value: 'EMB/BAC: Magnet', label: 'Magnet' }
];

export const borders = [
  { value: '', label: 'select...' },
  { value: 'EMB/BOR: Merrowed', label: 'Merrowed' },
  { value: 'EMB/BOR: Heat Cut', label: 'Heat Cut' }
];

export const peData = [
  { value: '', label: 'select...' },
  { value: 'EMB/PEM: 100%', label: '100%' },
  { value: 'EMB/PEM: 85%', label: '85%' },
  { value: 'EMB/PEM: 75%', label: '75%' },
  { value: 'EMB/PEM: 60%', label: '60%' },
  { value: 'EMB/PEM: 50%', label: '50%' },
  { value: 'EMB/PEM: 40%', label: '40%' }
];

export const cutData = [
  { value: '', label: 'select...' },
  { value: 'EMB/CUT: Round', label: 'Round' },
  { value: 'EMB/CUT: Square', label: 'Square' },
  { value: 'EMB/CUT: Rectangle', label: 'Rectangle' },
  { value: 'EMB/CUT: Contour (cut to shape of design)', label: 'Contour (cut to shape of design)' }
];

export const colorData = [
  { value: '', label: 'select...' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' }
];

export const packagingData = [
  { value: '', label: 'select...' },
  { value: 'None', label: 'None' },
  { value: 'Backer Card', label: 'Backer Card' },
  { value: 'Poly Bag and Header Card', label: 'Poly Bag and Header Card' },
  { value: 'Perforated Sheets', label: 'Perforated Sheets' },
  { value: 'Bar Code Sticker Attachments', label: 'Bar Code Sticker Attachments' }
];

export const size = ['0', '1/8', '2/8', '3/8', '4/8', '5/8', '6/8', '7/8'];

export const CustomerRoutes = [
  {
    route: '/dashboard',
    name: 'Dashboard'
  },
  {
    route: '/toggle-tutorials',
    name: 'Tutorials'
  },
  {
    route: '/contact',
    name: 'Contact'
  },
  {
    route: '/terms-of-services',
    name: 'Terms of Services'
  }
];

export const AdminRoutes = [
  {
    route: '/admin/wimpie',
    name: 'Wimpie'
  },
  {
    route: '/admin/price-sheet',
    name: 'Price Sheet'
  },
  {
    route: '/admin/Orders',
    name: 'Orders'
  }
];
