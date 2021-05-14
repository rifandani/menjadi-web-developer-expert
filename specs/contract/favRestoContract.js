const itActsAsFavoriteRestoModel = (favRestoIdb) => {
  it('should return the resto that has been added', async () => {
    favRestoIdb.putResto({ id: 1 });
    favRestoIdb.putResto({ id: 2 });

    expect(await favRestoIdb.getResto(1)).toEqual({ id: 1 });
    expect(await favRestoIdb.getResto(2)).toEqual({ id: 2 });
    expect(await favRestoIdb.getResto(3)).toEqual(undefined);
  });

  it('should refuse a resto from being added if it does not have the correct property', async () => {
    favRestoIdb.putResto({ aProperty: 'property' });

    expect(await favRestoIdb.getAllResto()).toEqual([]);
  });

  it('can return all of the resto that have been added', async () => {
    favRestoIdb.putResto({ id: 1 });
    favRestoIdb.putResto({ id: 2 });

    expect(await favRestoIdb.getAllResto()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite resto', async () => {
    favRestoIdb.putResto({ id: 1 });
    favRestoIdb.putResto({ id: 2 });
    favRestoIdb.putResto({ id: 3 });

    await favRestoIdb.deleteResto(1);

    expect(await favRestoIdb.getAllResto()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a resto even though the resto has not been added', async () => {
    favRestoIdb.putResto({ id: 1 });
    favRestoIdb.putResto({ id: 2 });
    favRestoIdb.putResto({ id: 3 });

    await favRestoIdb.deleteResto(4);

    expect(await favRestoIdb.getAllResto()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestoModel };
