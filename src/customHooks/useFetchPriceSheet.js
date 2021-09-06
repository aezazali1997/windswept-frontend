import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Schema from '../pages/AdminDashboard/pricesheet.json';
import { updateValues } from '../utils/helpers';
import { AddColumnSchema, PriceSheetSchema } from '../utils/validation_schema';

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


    const handleChange = (e, rowIndex) => {
        const { name, value } = e.target;
        let copyArray = [...data];
        let UpdatedArray = updateValues(copyArray, name, parseFloat(value), rowIndex);
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

    const RemoveRow = () => {
        let copyArray = [...data];
        let abc = copyArray.splice(copyArray.length - 1, 1);
        setData(copyArray);
    }


    const addColumn = () => {
        setModalTitle('Add Column');
        setInitialValues({ column: '' });
        toggleModal();
    }

    const _DeleteColumn = () => {
        // let copyArray = [...data];
        // let copyAllData = [...allData];
        // let updatedPricingData = [];
        // if (!isEmpty(copyArray)) {
        //     updatedPricingData = copyArray.map(item => {
        //         const x = Object.keys(item)
        //         if (x) {
        //             console.log('x: ', x);
        //             delete item[x[x.length - 1]]
        //             return item;
        //         }
        //     });
        // }
        // let updateData = copyAllData.map((item, i) => {
        //     if (i !== selected?.index) return item;
        //     return item;
        // })
        // console.log('AfterCell: ', updatedPricingData);
        // setData(updatedPricingData);
        // setAllData([updateData]);
    }

    const onSelectSheet = (values) => {
        setSelected(values);
        allData.filter(({ title, material, pricing }) => {
            if (values.label === `${title} - ${material}`) {
                setData(pricing);
            }
        })
    }

    const addNewSheet = () => {
        setModalTitle('Add Sheet');
        setInitialValues({ title: '', material: '' });
        toggleModal();
    }

    const _DeleteSheet = () => {
        setModalTitle('Delete Sheet');
        setInitialValues({});
        toggleModal();
    }

    const _onDelete = () => {
        let copyOriginalData = [...allData];
        let copyOriginalSheets = [...sheets];
        copyOriginalData.splice(selected?.id, 1);
        copyOriginalSheets.splice(selected?.id, 1);
        if (!isEmpty(copyOriginalData)) {
            setSelected(copyOriginalSheets[0]);
            setData(copyOriginalData[0].pricing);
        }
        else {
            setSelected({});
            setData([]);
        }

        setSheets(copyOriginalSheets);
        setAllData(copyOriginalData);
        toggleModal();
    }

    const _SaveSheet = () => {
        setModalTitle('Save Sheet');
        setInitialValues({});
        toggleModal();
    }

    const renameSheetTitle = () => {
        setModalTitle('Rename Sheet Title');
        const values = selected?.value.split('-');
        if (!isEmpty(values)) {
            const data = {
                title: values[0]?.trim(),
                material: values[1]?.trim()
            }
            setInitialValues(data);
        }
        toggleModal();
    }

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validateOnBlur: true,
        validationSchema: (modalTitle === 'Add Sheet' || modalTitle === 'Rename Sheet Title' ? PriceSheetSchema
            : AddColumnSchema),
        onSubmit: (res, { setStatus, setSubmitting }) => {
            enableLoading();
            setTimeout(() => {
                const payload = {
                    title: res.title,
                    material: res.material
                }
                if (modalTitle.match('Rename Sheet Title')) {
                    if (selected) {
                        let selectedIndex = selected?.id;
                        const name = `${res.title} - ${res.material}`;
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
                            item.title = res.title;
                            item.material = res.material;
                            return item;
                        })
                        setSheets(newSheet);
                        setSelected(newObj);
                    }
                }
                else if (modalTitle.match('Add Sheet')) {
                    const name = `${res.title} - ${res.material}`;
                    const copySheets = [...sheets];
                    let newObj = {
                        value: name,
                        label: name,
                        id: sheets.length
                    }
                    let newSheet = [...copySheets, newObj];
                    let updateAllData = [...allData, { title: res.title, material: res.material, pricing: [] }]
                    setSheets(newSheet);
                    setSelected(newObj);
                    setAllData(updateAllData);
                    setData([]);
                }
                else if (modalTitle === 'Add Column') {
                    const title = res.column.replaceAll(" ", "");
                    let copyArray = [...data];
                    if (isEmpty(copyArray)) {

                        let copyAllData = [...allData];
                        let newData = copyAllData.map((item, i) => {
                            if (i !== selected?.id) return item;
                            item.pricing.push({ [title]: '' });
                            return item;
                        });
                        setData(newData[selected?.id]?.pricing);
                        setAllData(newData);
                    }
                    else {
                        let newCol = copyArray.map((item, i) => {
                            return { ...item, [title]: '' };
                        })
                        setData(newCol);
                    }
                }
                // else if (modalTitle === 'Delete Sheet') {

                // }
                else {
                    console.log('Save button clicked');
                }
                toggleModal()

            }, 1000);
        },
    })



    return {
        data, selected, sheets, showNameModal, formik, modalTitle, initialValues, getInputClasses, addNewSheet, addRow, RemoveRow, addColumn,
        handleChange, onSelectSheet, toggleModal, renameSheetTitle, _DeleteSheet, _SaveSheet, _DeleteColumn, _onDelete
    }
}

export default UseFetchPriceData
