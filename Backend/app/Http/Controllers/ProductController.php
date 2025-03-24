<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
class ProductController extends Controller
{

    public function store(Request $request)
    {
        // Validate the input data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'dp' => 'required|numeric',
            'category' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        try {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('product_images', 'public');
            }
            $input = $request->all();
            $input['image'] = $imagePath;
            $product = Product::create($input);
            return response()->json([
                'status' => true,
                'message' => 'Product added successfully!',
                'data' => $product,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while adding the product!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getProduct()
    {
        try {
            $product = Product::first();
            return response()->json([
                'status' => true,
                'data' => $product,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching product.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function updateProduct(Request $request)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required|numeric',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'dp' => 'required|numeric',
            'description' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }
        try {
            $object = Product::find($input['id']);
            if(!$object){
                return response()->json([
                    'status' => false,
                    'message' => 'product not found',
                    'data' => $object,
                ], status: 400);
            }
            $object->name = $input['name'];
            $object->price = $input['price'];
            $object->dp = $input['dp'];
            $object->description = $input['description'];
            $object->save();
            return response()->json([
                'status' => true,
                'message' => 'product updated successfully!',
                'data' => $object,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while product updated!.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function deleteProduct(Request $request, $id){
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found.',
                ], 404);
            }
            $product->save();
            $product->delete();
            return response()->json([
                'status' => true,
                'message' => 'product deleted successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while deleting the object.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
