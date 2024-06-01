import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Textarea, Input, Stack, Flex, IconButton, RadioGroup, Radio } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCustomers, fetchProducts, createSaleOrder } from '../api';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const SaleOrderForm = ({ onClose, onSubmit, defaultValues = {}, readOnly = false }) => {
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset, setValue } = useForm({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: 'products' });
  const { data: customers } = useQuery(['customers'], fetchCustomers);
  const { data: productsData } = useQuery(['products'], fetchProducts);

  const mutation = useMutation(createSaleOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['activeSaleOrders']);
      reset();
      onClose();
    }
  });

  useEffect(() => {
    if (defaultValues) {
      setValue('customer', defaultValues.customer || null);
      setValue('products', defaultValues.products || []);
      setValue('invoice_date', defaultValues.invoice_date ? parseISO(defaultValues.invoice_date) : null);
      setValue('notes', defaultValues.notes || '');
      setValue('paid', defaultValues.paid || false);
    }
  }, [defaultValues, setValue, reset]);

  const handleFormSubmit = (data) => {
    console.log("Submitted data with notes:", data); 
    if (!data || !data.customer || !data.products || !data.invoice_date) {
      console.error('Required data is missing.');
      return;
    }

    const { customer, products, invoice_date, paid } = data;
    const payload = {
      customer_id: customer.value,
      notes: data.notes,
      customer_name: customer.label,
      items: products.map(product => ({
        sku_id: product.value,
        product_name: product.label,
        price: parseFloat(product.price) || 0,
        quantity: product.quantity || 1
      })),
      paid: paid,
      invoice_no: `Invoice-${Math.random().toString(36).substring(2, 11)}`,
      invoice_date: new Date(invoice_date).toISOString().split('T')[0],
      lastModified: new Date().toLocaleString()
    };

    mutation.mutate(payload, {
      onSuccess: (response) => {
        onSubmit({ ...payload });
      }
    });
  };

  const handleAddProduct = () => {
    append({ value: '', label: '', price: 0, quantity: 1 });
  };

  const handleRemoveProduct = (index) => {
    remove(index);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleFormSubmit)} p={4} borderWidth={1} borderRadius="lg">

      <FormControl isRequired>
        <FormLabel>Customer</FormLabel>
        <Controller name="customer" control={control} render={({ field }) => ( <Select {...field} options={customers?.map(c => ({ value: c.id, label: c.name })) || []} isDisabled={readOnly} /> )} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Products</FormLabel>

        {fields.map((field, index) => (

          <Stack key={field.id} direction="row" spacing={4}>
            <Flex align="center">

             <Controller name={`products[${index}]`} control={control} render={({ field: productField }) => ( <Select {...productField} options={productsData?.map(p => ({ value: p.id, label: p.name })) || []} isDisabled={readOnly} /> )} />

             <Controller name={`products[${index}].price`} control={control} render={({ field }) => ( <Input {...field} type="number" placeholder="Price" isDisabled={readOnly} step="0.01" style={{width:"35%"}} /> )} />
             {!readOnly && ( <IconButton aria-label="Remove product" icon={<DeleteIcon />} onClick={() => handleRemoveProduct(index)} /> )}

            </Flex>
          </Stack>

        ))}
       {!readOnly && ( <Button leftIcon={<AddIcon />} onClick={handleAddProduct} mt={2}> Add Product </Button> )}
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Invoice Date</FormLabel>
        <Controller name="invoice_date" control={control} render={({ field }) => ( <DatePicker {...field} selected={field.value} onChange={(date) => field.onChange(date)} disabled={readOnly} /> )} />
      </FormControl>

      <FormControl>
        <FormLabel>Notes</FormLabel>
        <Controller name="notes" control={control} render={({ field }) => ( <Textarea {...field} isDisabled={readOnly} /> )} />
      </FormControl>

      <FormControl>
        <FormLabel>Status</FormLabel>
        <Controller name="paid" control={control} render={({ field }) => ( <RadioGroup {...field} isDisabled={readOnly}> <Stack direction="row"> <Radio value={true}>Paid</Radio> <Radio value={false}>Unpaid</Radio> </Stack> </RadioGroup> )} />
      </FormControl>

      <Stack direction="row" spacing={4} mt={4}>
         <Button colorScheme="teal" type="submit" isDisabled={readOnly}>Submit</Button>
         <Button variant="outline" onClick={onClose}>Cancel</Button>
       </Stack>
    </Box>
  );
};

const queryClient = new QueryClient();

const SaleOrderFormWrapper = (props) => (
  <QueryClientProvider client={queryClient}>
    <SaleOrderForm {...props} />
  </QueryClientProvider>
);

export default SaleOrderFormWrapper;
