package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.CheckedWeaponsDTO;

import java.util.UUID;

public interface CheckedWeaponsService {
 ApiResponse addWeapons(CheckedWeaponsDTO checkedWeaponsDTO, UUID userid);
 ApiResponse update(Long id, CheckedWeaponsDTO checkedWeaponsDTO);
 ApiResponse delete(Long id);
 ApiResponse getWeapons();
 ApiResponse getIdWeapons(Long id);

}
