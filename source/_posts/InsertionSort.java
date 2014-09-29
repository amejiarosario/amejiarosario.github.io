// javac InsertionSort.java && java -ea InsertionSort
class InsertionSort {
  void sort(int[] arr){
    for(int x=1; x < arr.length; x++)
      for(int y=x; y > 0 && arr[y-1] > arr[y]; y--){
          int t = arr[y];
          arr[y] = arr[y-1];
          arr[y-1] = t;
        }
  }

  public static void main(String[] args){
    int[] arr = {20, 1, 2, 4, 8};
    int[] sorted = {1,2,4,8,20};

    InsertionSort insertion = new InsertionSort();
    insertion.sort(arr);

    assert(java.util.Arrays.equals(arr,sorted)) : "failed sorting";
  }
}
