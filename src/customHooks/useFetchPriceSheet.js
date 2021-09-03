import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Schema from '../pages/AdminDashboard/pricesheet.json';
import { updateValues } from '../utils/helpers';
import { PriceSheetSchema } from '../utils/validation_schema';

const UseFetchPriceData = () => {
    const [allData, setAllData] = useState([]);
    const [sheets, setSheets] = useState([]);
    const [selected, setSelected] = useState({});
    const [data, setData] = useState([]);
    const [showNameModal, setShowNameModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [initialValues, setInitialValues] = useState({
        title: '',
        material: ''
    });

    useEffect(() => {
        setAllData(Schema);
        const Sheets = Schema.map((obj, index) => ({
            value: `${obj.title} - ${obj.material}`,
            label: `${obj.title} - ${obj.material}`,
            id: index
        }));
        setSheets(Sheets);
        if (!isEmpty(Sheets)) {
            setSelected(Sheets[0]);
            setData(Schema[0]?.pricing || [])
        }
    }, []);

    useEffect(() => { }, [sheets, data])

    const toggleModal = () => {
        setShowNameModal(!showNameModal);
    }

    // console.log('allData: ', allData);
    // console.log('selected: ', selected);
    // console.log('sheets: ', sheets);

    const onSelectSheet = (values) => {
        setSelected(values);
        allData.filter(({ title, material, pricing }) => {
            if (values.label === `${title} - ${material}`) {
                setData(pricing);
            }
        })
    }

    const addRow = () => {
        let copyArray = [...data];
        let newRow = {};
        if (!isEmpty(copyArray)) {
            newRow = copyArray[0];
            let updatedRow = {};
            newRow = Object.keys(newRow);
            newRow.map(key => {
                updatedRow[key] = ''
            })
            copyArray = [...copyArray, updatedRow];
        }
        else {
            copyArray = [...copyArray, {}]
        }
        setData(copyArray);
    }

    const handleChange = (e, rowIndex) => {
        const { name, value } = e.target;
        let copyArray = [...data];
        let UpdatedArray = updateValues(copyArray, name, parseFloat(value), rowIndex);
        console.log({ UpdatedArray })
        setData(copyArray);
    }

    let addColumn = () => {
        setModalTitle('Add Column');
        Swal.fire({
            title: 'Enter new Column Title',
            text: 'Once added, cannot be renamed',
            input: 'text',
            inputAutoTrim: true,
            inputAttributes: {
                autocapitalize: 'off',
            },
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value !== '') {
                        resolve()
                    } else {
                        resolve('You need to write something')
                    }
                })
            },
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: false,
            preConfirm: (title) => {
            },
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                const { value } = result;
                if (value !== '') {
                    const title = value.trim();
                    let copyArray = [...data];
                    if (isEmpty(copyArray)) {
                        console.log('Inside Empty Data')

                        let copyAllData = [...allData];
                        let newData = copyAllData.map((item, i) => {
                            if (i !== selected?.id) return item;
                            item.pricing.push({ [title]: '' });
                            return item;
                        });
                        console.log({ newData })
                        setData(newData[selected?.id]?.pricing);
                        setAllData(newData);
                    }
                    else {
                        console.log('Not Empty Data')
                        let newCol = copyArray.map((item, i) => {
                            return { ...item, [title]: '' };

                        })
                        console.log({ newCol });
                        setData(newCol);

                    }
                }
            }
        })



    }

    let RemoveRow = () => {
        let copyArray = [...data];
        let abc = copyArray.splice(copyArray.length - 1, 1);
        console.log('AfterCell: ', copyArray);
        setData(copyArray);
    }

    let addNewSheet = () => {
        setModalTitle('Add Sheet');
        setInitialValues({ title: '', material: '' });
        toggleModal();
    }

    let renameSheetTitle = () => {
        setModalTitle('Rename Sheet Title');
        const values = selected?.value.split('-');
        console.log('values: ', values);
        if (!isEmpty(values)) {
            const data = {
                title: values[0]?.trim(),
                material: values[1]?.trim()
            }
            console.log(data);
            setInitialValues(data);
        }
        toggleModal();
    }

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "border-red-500";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "border-blue-500";
        }

        return "";
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validateOnBlur: true,
        validationSchema: PriceSheetSchema,
        onSubmit: ({ title, material }, { setStatus, setSubmitting }) => {
            enableLoading();
            setTimeout(() => {
                const payload = {
                    title,
                    material
                }
                console.log({ payload });
                if (modalTitle.match('Rename Sheet Title')) {
                    console.log('Inside Rename')
                    if (selected) {
                        let selectedIndex = selected?.id;
                        const name = `${title} - ${material}`;
                        let newObj = {
                            value: name,
                            label: name,
                            id: selectedIndex,
                        }
                        let newSheet = sheets.map((item, i) => {
                            if (i !== selectedIndex) return item;
                            item = newObj;
                            return item;
                        })
                        let updateData = allData.map((item, i) => {
                            if (i !== selectedIndex) return item;
                            item.title = title;
                            item.material = material;
                            return item;
                        })
                        setSheets(newSheet);
                        setSelected(newObj);
                    }
                }
                else if (modalTitle.match('Add Sheet')) {
                    console.log('Inside Add Sheet');
                    const name = `${title} - ${material}`;
                    const copySheets = [...sheets];
                    let newObj = {
                        value: name,
                        label: name,
                        id: sheets.length
                    }
                    let newSheet = [...copySheets, newObj];
                    let updateAllData = [...allData, { title, material, pricing: [] }]
                    console.log({ newSheet })
                    setSheets(newSheet);
                    setSelected(newObj);
                    setAllData(updateAllData);
                    setData([]);
                }
                toggleModal()

            }, 1000);
        },
    })



    return {
        data, selected, sheets, showNameModal, formik, modalTitle, initialValues, getInputClasses, addNewSheet, addRow, RemoveRow, addColumn,
        handleChange, onSelectSheet, toggleModal, renameSheetTitle
    }
}

export default UseFetchPriceData
